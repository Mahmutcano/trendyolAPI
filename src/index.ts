import express, { Express, Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";
import MostCardAdd from "./mostCartAddTypes";

const PORT = process.env.PORT || 8000;
const app: Express = express();

app.get("/mostAddedCart/:page", async (req: Request, res: Response) => {
  const page: string = req.params.page;
  const url: string = `https://www.trendyol.com/sr?fl=sepetteurunler&pi=${page}`;

  try {
    const response = await axios.get(url);
    const html: string = response.data;
    const $ = cheerio.load(html);
    const mostCardAdd: MostCardAdd[] = [];

    $('a[href^="/"]').each(function () {
      const title: string = $(this)
        .find("span.prdct-desc-cntnr-name")
        .text()
        .trim();
      const imageUrl: string | undefined = $(this)
        .find(".image-container .p-card-img-wr img")
        .attr("src");
      const price: string = $(this)
        .find(".price-promotion-container .prc-cntnr.discountedPriceBox")
        .text()
        .trim();
      const url: string = "https://www.trendyol.com" + $(this).attr("href");

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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(`Error in fetching page ${page}:`, error.message);
    } else {
      console.error(`Unknown error in fetching page ${page}:`, error);
    }
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
