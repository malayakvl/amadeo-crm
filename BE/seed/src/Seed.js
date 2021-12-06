import Validator from './Validator.js';
import FileManager from './FileManager.js';

export default class Seed {
    config = {
        user: 'postgres',
        database: 'amadeo_crm',
        password: 'password',
        host: '127.0.0.1',
        port: 5432,
        max: '20',
        idleTimeoutMillis: '30000'
        
    }

    /**
     * @protected
     * @type {Validator}
     */
    validator

    /**
     * @protected
     * @type {FileManager}
     */
    fileManager

    /**
     * @constructor
     */
    constructor() {
        this.validator = new Validator()
        this.fileManager = new FileManager()

    }

    /**
     *
     * @param {array} argv
     */
    run(argv) {
        let operation = argv[0]

        this.validator.validateOperation(operation)

        let allSeedFiles = this.fileManager.getSeedFiles()
        let seed = argv[1]

        if (seed) {
            let seedFile = this.fileManager.seedsDir + seed + '.js'
            
            if (allSeedFiles.indexOf(seedFile) < 0) {
                throw new Error(`The file does't exist`)

            }

            this.runSeedFile(operation, seedFile)

        } else {
            allSeedFiles.forEach(seedFile => {
                this.runSeedFile(operation, seedFile)
    
            })

        }

    }

    /**
     *
     * @param {string} operation
     * @param {string} seed
     */
    async runSeedFile(operation, seedFile) {
        let seedImport = await import(seedFile)
        let seed = seedImport.default

        this.validator.validateSeed(seed)

        console.log(seed[operation])

        // let query = seed[operation]

        // const pool = new pg.Pool(this.config);

        // const client = await pool.connect();

        // await client.query(query);

    }

}
