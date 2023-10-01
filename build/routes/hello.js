"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Hello</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      img {
        display: block;
        margin: 50px auto;
      }
      div.container {
        width: 50%;
        margin: auto;
      }
      div.box {
        background: #ffffff;
        margin: 20px 0;
        padding: 20px;
      }
      input {
        width: calc(100% - 20px);
        padding: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
        border-radius: 5px;
        border: 1px solid #dddddd;
        box-sizing: border-box;
      }
      button {
        display: inline-block;
        font-size: 16px;
        color: #ffffff;
        background: #50b3a2;
        padding: 10px 20px;
        text-decoration: none;
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #439b8a;
      }
      pre {
        display: none;
        margin-top: 20px;
        padding: 20px;
        background-color: #e6e6e6;
        max-height: 200px;
        overflow: auto;
    }
    </style>
  </head>
  <body>
  <div class="container">
  <div class="box" id="mostAddedCart">
    <h2>Trendyol Most Card Add and Search Product APIs</h2>
  </div>
</div>
    <div class="container">
      <div class="box" id="mostAddedCart">
        <h2>How to use mostAddedCart endpoint</h2>
        <p>You can use the /mostAddedCart/:page endpoint to get the most added cart items. For example, /mostAddedCart/1 will give you the items on the first page.</p>
        <input type="text" id="pageInput" placeholder="Enter page number" />
        <button onclick="toggleAccordion('mostAddedCartResponse', getMostAddedCart)">Get Most Added Cart Items</button>
        <pre id="mostAddedCartResponse"></pre>
      </div>
    </div>
  </body>
  <script>
    async function getMostAddedCart() {
      const page = document.getElementById('pageInput').value;
      try {
        const response = await fetch(\`/mostAddedCart/\${page}\`);
        const data = await response.json();
        document.getElementById('mostAddedCartResponse').textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        console.error('Error fetching most added cart items:', error);
      }
    }
    
    function toggleAccordion(elementId, callback) {
        const element = document.getElementById(elementId);
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
        if (element.style.display === 'block' && callback) {
            callback();
        }
    }
  </script>
  </html>`;
    res.send(html);
}));
exports.default = router;
