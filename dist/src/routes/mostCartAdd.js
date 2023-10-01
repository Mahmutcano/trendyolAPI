"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const router = (0, express_1.Router)();
router.get("/:page", async (req, res) => {
    const page = req.params.page;
    const url = `https://www.trendyol.com/sr?fl=sepetteurunler&pi=${page}`;
    try {
        const response = await axios_1.default.get(url);
        const html = response.data;
        const $ = cheerio_1.default.load(html);
        const mostCardAdd = [];
        $('a[href^="/"]').each(function () {
            const title = $(this)
                .find("span.prdct-desc-cntnr-name")
                .text()
                .trim();
            const imageUrl = $(this)
                .find(".image-container .p-card-img-wr img")
                .attr("src");
            const price = $(this)
                .find(".price-promotion-container .prc-cntnr.discountedPriceBox")
                .text()
                .trim();
            const url = "https://www.trendyol.com" + $(this).attr("href");
            if (title && imageUrl && price) {
                mostCardAdd.push({
                    title,
                    imageUrl,
                    price,
                    url,
                });
            }
        });
        res.json(mostCardAdd);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error(`Error in fetching page ${page}:`, error.message);
        }
        else {
            console.error(`Unknown error in fetching page ${page}:`, error);
        }
        res.status(500).send("Internal Server Error");
    }
});
exports.default = router;
//# sourceMappingURL=mostCartAdd.js.map