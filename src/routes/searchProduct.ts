import { Router, Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";
import MostCardAdd from "../types/mostCartAddTypes";

const router = Router();

router.get("/search/:query1/:query2?/:page", async (req: Request, res: Response) => {
    const { query1, query2, page } = req.params;
    
    let query: string;
    if(query2) {
      // Eğer ikinci query parametresi varsa, birleştirilmiş halini kullanırız.
      query = `${encodeURIComponent(query1)}%20${encodeURIComponent(query2)}`;
    } else {
      // Eğer ikinci query parametresi yoksa, sadece birincisini kullanırız.
      query = encodeURIComponent(query1);
    }
    const url = `https://www.trendyol.com/sr?q=${query}&os=${page}`;
    
    try {
      const response = await axios.get(url);
      const html: string = response.data;
      const $ = cheerio.load(html);
      const articles: MostCardAdd[] = [];
  
      $('a[href^="/"]').each(function () {
        const title: string = $(this).find("span.prdct-desc-cntnr-name").text().trim();
        const imageUrl: string | undefined = $(this).find(".image-container .p-card-img-wr img").attr("src");
        const price: string = $(this).find(".price-promotion-container .prc-cntnr.discountedPriceBox").text().trim();
        const url: string = "https://www.trendyol.com" + $(this).attr("href");
  
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
    } catch (error) {
      console.error(`Error in fetching queries ${query1}, ${query2 ? query2 : ''} on page ${page}:`, error);
      res.status(500).send("Internal Server Error");
    }
  });

export default router;
