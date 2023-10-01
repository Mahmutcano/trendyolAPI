"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const router = (0, express_1.Router)();
router.get("/search/:query1/:query2?/:page", async (req, res) => {
    const { query1, query2, page } = req.params;
    let query;
    if (query2) {
        // Eğer ikinci query parametresi varsa, birleştirilmiş halini kullanırız.
        query = `${encodeURIComponent(query1)}%20${encodeURIComponent(query2)}`;
    }
    else {
        // Eğer ikinci query parametresi yoksa, sadece birincisini kullanırız.
        query = encodeURIComponent(query1);
    }
    const url = `https://www.trendyol.com/sr?q=${query}&os=${page}`;
    try {
        const response = await axios_1.default.get(url);
        const html = response.data;
        const $ = cheerio_1.default.load(html);
        const articles = [];
        $('a[href^="/"]').each(function () {
            const title = $(this).find("span.prdct-desc-cntnr-name").text().trim();
            const imageUrl = $(this).find(".image-container .p-card-img-wr img").attr("src");
            const price = $(this).find(".price-promotion-container .prc-cntnr.discountedPriceBox").text().trim();
            const url = "https://www.trendyol.com" + $(this).attr("href");
            if (title && imageUrl && price) {
                articles.push({
                    title,
                    imageUrl,
                    price,
                    url,
                });
            }
        });
        res.json(articles);
    }
    catch (error) {
        console.error(`Error in fetching queries ${query1}, ${query2 ? query2 : ''} on page ${page}:`, error);
        res.status(500).send("Internal Server Error");
    }
});
exports.default = router;
//# sourceMappingURL=searchProduct.js.map