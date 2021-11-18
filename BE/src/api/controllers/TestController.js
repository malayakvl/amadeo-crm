class TestController {
    async testData (req, res) {
        let error;
        const testData = [
            { id: 1, title: "Page 1" },
            { id: 2, title: "Page 2" }
        ];
        if (testData) res.status(200).json({ user: {name: "This is Test User", id: 10, token: "dddweqeeew"} });
        if (error) res.status(error.code).json({error: 'Show error message'});
    }
}

export default new TestController();
