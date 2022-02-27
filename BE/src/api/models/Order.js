import pool from './connect.js';
import { logger } from '../../common/logger.js';
import fs from 'fs';
import PDFDocument from 'pdfkit'
import moment from 'moment';
import pdf2base64 from 'pdf-to-base64';
import {
    setTimeout,
} from 'timers/promises';

function createInvoice (invoice, path) {
    try {
        let doc = new PDFDocument({ size: "A4", margin: 50 });
        
        generateHeader(doc);
        generateCustomerInformation(doc, invoice);
        generateInvoiceTable(doc, invoice);
        generateFooter(doc);
        
        doc.end();
        doc.pipe(fs.createWriteStream(path));
        
        return {success: true}
    } catch (e) {
        return {success: false}
    }
}


function generateHeader(doc) {
    doc
        // .image("./public/images/logoBig.png", 90, 45, { width: 90 })
        .fillColor("#444444")
        .fontSize(20)
        .text("", 170, 57)
        .fontSize(10)
        .text("LiveProshop Inc.", 200, 50, { align: "right" })
        .text("123 Main Street", 200, 65, { align: "right" })
        .text("New York, NY, 10025", 200, 80, { align: "right" })
        .moveDown();
}
function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);
    
    generateHr(doc, 185);
    
    const customerInformationTop = 200;
    
    doc
        .fontSize(10)
        .text("Numéro de facture:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.invoice_nr, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(invoice.invoice_date, 150, customerInformationTop + 15)
        .text("Balance Due:", 50, customerInformationTop + 30)
        .text(
            formatCurrency(invoice.paid),
            150,
            customerInformationTop + 30
        )
        
        .font("Helvetica-Bold")
        .text(invoice.shipping.name, 300, customerInformationTop)
        .font("Helvetica")
        .text(invoice.shipping.address, 300, customerInformationTop + 15)
        // .text(
        //     invoice.shipping.city +
        //     ", " +
        //     invoice.shipping.state +
        //     ", " +
        //     invoice.shipping.country,
        //     300,
        //     customerInformationTop + 30
        // )
        .moveDown();
    
    generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;
    
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item",
        "Description",
        "Unit Cost",
        "Quantity",
        "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
    
    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.name,
            item.description,
            formatCurrency(item.price),
            item.quantity,
            formatCurrency(item.price * item.quantity)
        );
        
        generateHr(doc, position + 20);
    }
    
    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        "",
        formatCurrency(invoice.subtotal)
    );
    
    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "",
        "Shipping Amount",
        "",
        formatCurrency(invoice.shipping_amount)
    );
    
    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        duePosition,
        "",
        "",
        "Total Payment",
        "",
        formatCurrency(invoice.paid)
    );
    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    item,
    description,
    unitCost,
    quantity,
    lineTotal
) {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(description, 150, y)
        .text(unitCost, 280, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(cents) {
    // return "$" + (cents / 100).toFixed(2);
    return parseFloat(cents).toFixed(2)+'€';
}

// function formatDate(date) {
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//
//     return year + "/" + month + "/" + day;
// }


class Order {
    async createOrders (sessionId) {
        const client = await pool.connect();
        try {
            const productQuery = `SELECT * FROM data.set_orders_from_live_sessions_messages(${sessionId}, 100);`;
            await client.query(productQuery);
            const items = [];
            const error = null;
    
            return {
                items,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Create orders):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                items,
                error
            };
        } finally {
            client.release();
        }
    }
    
    async fetchWaitingItems (page, perPage = 20, user, isRead = false, reqOffset = null, filters, column, sort) {
        const client = await pool.connect();
        try {
            const _filters = JSON.parse(filters);
            if (user.role_id === 2) {
                _filters.seller_id = [user.id];
                // if (_filters.userIds) {
                //     _filters.buyer_id = _filters.userIds;
                //     delete _filters.userIds;
                // }
            }
            const _total = await client.query(`SELECT count FROM data.get_orders_waiting_list_count('${JSON.stringify(_filters)}');`);
            const size = _total.rows[0].count;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const ordersQuery = `SELECT
                                    id_cnt, live_sessions_id, product_id, product_configuration_id, configuration, item_buyers, total_quantity, total_price
                                    FROM data.get_orders_waiting_list(${perPage}, ${offset}, '${JSON.stringify(_filters)}', '${column} ${sort}');`;
            console.log(ordersQuery);
            const res = await client.query(ordersQuery);
            const items = res.rows.length > 0 ? res.rows : [];
            const error = null;
            
            return {
                items,
                size,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Products getAll):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                items,
                error
            };
        } finally {
            client.release();
        }
    }
    
    
    async fetchItems (page, perPage = 20, user, isRead = false, reqOffset = null, filters, column, sort) {
        const client = await pool.connect();
        try {
            const _filters = JSON.parse(filters);
            if (user.role_id === 2) {
                _filters.seller_id = [user.id];
                if (_filters.userIds) {
                    _filters.buyer_id = _filters.userIds;
                    delete _filters.userIds;
                }
            }
            if (_filters.status.length === 0) {
                _filters.status = ["payed", "shipped", "canceled"];
            }
            const _total = await client.query(`SELECT count FROM data.get_orders_count('${JSON.stringify(_filters)}');`);
            const size = _total.rows[0].count;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            if (!column && !sort) {
            
            } else {
            
            }
            const ordersQuery = `SELECT id, live_sessions_id, shipping_id, country_id, payment_id, order_amount, discount_amount,
                                    total_amount, order_number, status, created_at, updated_at, seller_id,
                                    seller_first_name, seller_photo, buyer_id,
                                    buyer_first_name, buyer_photo, flag_name, shipping_image, order_items
                                FROM data.get_orders (${perPage}, ${offset}, '${JSON.stringify(_filters)}', '${column} ${sort}');`;
            const res = await client.query(ordersQuery);
            const items = res.rows.length > 0 ? res.rows : [];
            const error = null;
            
            return {
                items,
                size,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Products getAll):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                items,
                error
            };
        } finally {
            client.release();
        }
    }
    
    async fetchFilters () {
        const client = await pool.connect();
        try {
            const res = {};
            const shipping = await client.query('SELECT * FROM data.get_orders_shipping();');
            res.shippings = shipping.rows[0].shipping ? shipping.rows[0].shipping : [];
            const payments = await client.query('SELECT * FROM data.get_orders_payments();');
            res.payments = payments.rows[0].payments ? payments.rows[0].payments : [];
            const countries = await client.query('SELECT * FROM data.get_orders_countries();');
            res.countries = countries.rows[0].countries ? countries.rows[0].countries : [];
            const amounts = await client.query('SELECT * FROM data.get_orders_total_amount_range();');
            res.amounts = amounts.rows[0].total_amount_range.min ? [amounts.rows[0].total_amount_range.min, amounts.rows[0].total_amount_range.max] : [];
            const error = null;
            return {
                res,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Products getAll):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                items,
                error
            };
        } finally {
            client.release();
        }
    }
    
    
    
    
    async generatePdf (orderNumber, userId) {
        const client = await pool.connect();
    
        let error = null;
    
        try {
            const filter = JSON.stringify({
                status: ["payed"],
                seller_id: userId,
                order_number: orderNumber
            })
            const ordersQuery = `SELECT id, order_items,
                                    payment_id, payment_name, payment_short_name,
                                    total_amount, order_number, order_amount,
                                    buyer_first_name, buyer_photo,
                                    flag_name, shipping_image, shipping_address,
                                    created_at
                                FROM data.get_orders (1, 0, '${filter}');`;
            const res = await client.query(ordersQuery);
            const dirUpload = `${process.env.DOWNLOAD_FOLDER}/orders/${userId}`;
            
            if (fs.existsSync(`${process.env.DOWNLOAD_FOLDER}/orders/${userId}/${res.rows[0].order_number}.pdf`)) {
                const base64 = await pdf2base64(`${process.env.DOWNLOAD_FOLDER}/orders/${userId}/${res.rows[0].order_number}.pdf`)
                    .then(
                        (response) => {
                            return response;
                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error); //Exepection error....
                        }
                    );
                return {
                    filename: `${process.env.DB_DOWNLOAD_FOLDER}/orders/${userId}/${res.rows[0].order_number}.pdf`,
                    fileEncoded: base64,
                    error: null
                }
            } else {
                if (!fs.existsSync(dirUpload)) {
                    fs.mkdirSync(dirUpload);
                }
            }
            if (res.rows.length > 0) {
                const invoice = {
                    shipping: {
                        name: res.rows[0].buyer_first_name,
                        address: res.rows[0].shipping_address,
                        
                    },
                    items: res.rows[0].order_items,
                    subtotal: res.rows[0].order_amount,
                    shipping_amount: res.rows[0].total_amount - res.rows[0].order_amount,
                    paid: res.rows[0].total_amount,
                    invoice_nr: res.rows[0].order_number,
                    invoice_date: moment(res.rows[0].created_at).format('DD/MM/YYYY'),
                };
                createInvoice(invoice, `${dirUpload}/${res.rows[0].order_number}.pdf`);
    
                await setTimeout(2000);
                if (!fs.existsSync(`${process.env.DOWNLOAD_FOLDER}/orders/${userId}/${res.rows[0].order_number}.pdf`)) {
                    await setTimeout(2000);
                }
                const base64 = await pdf2base64(`${process.env.DOWNLOAD_FOLDER}/orders/${userId}/${res.rows[0].order_number}.pdf`)
                    .then(
                        (response) => {
                            console.log(response);
                            return response;
                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error); //Exepection error....
                        }
                    );
                return {
                    filename: `${process.env.DB_DOWNLOAD_FOLDER}/orders/${userId}/${res.rows[0].order_number}.pdf`,
                    fileEncoded: base64,
                    error: null
                }
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Products getAll):',
                    { message: e.message }
                );
            }
            error = {
                code: 500,
                message: 'Error get list of users'
            };
            return  {
                fileName: '',
                error
            }
        } finally {
            client.release();
        }
    }
}



export default new Order();
