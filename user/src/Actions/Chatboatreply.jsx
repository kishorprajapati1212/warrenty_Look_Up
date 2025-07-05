import axios from "axios";

const chatboat = async({Gemini_api, Gemini_key, textContent, }) => {
    const prompt = `
You are an AI that extracts structured data from plain text.

From the following PDF text:
1. Extract the **single order date** in "YYYY-MM-DD" format.
2. Extract a list of products. For each product, provide:
   - "product_name"
   - "product_type" (e.g., "smartphone", "smartwatch", "laptop", etc.)
   - "warranty_type" (e.g., "manufacturer", "repairing", "extended")
   - "warranty_duration" as an object:
     {
       "value": (number),
       "unit": "months" or "years"
     }
   - "quantity" (number of units purchased)

If a product has **no warranty details mentioned**, assume:
- "warranty_type": "manufacturer"
- "warranty_duration": { "value": 12, "unit": "months" }

❗️Exclude products that are clearly small accessories or items unlikely to have a warranty (e.g., plastic covers, cables, add-ons).

Return the result in the following **valid JSON format only** (no explanation or markdown):

{
  "order_date": "YYYY-MM-DD",
  "products": [
    {
      "product_name": "Product A",
      "product_type": "smartphone",
      "warranty_type": "manufacturer",
      "warranty_duration": {
        "value": 12,
        "unit": "months"
      },
      "quantity": 1
    }
  ]
}

Here is the extracted PDF text:
${textContent}
`;


    const response = await axios.post(
        `${Gemini_api}?key=${Gemini_key}`,
        { contents: [{ parts: [{ text: prompt }], },], },
        { headers: { "Content-Type": "application/json" }, }
    );
    const reply = await response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    const cleaned = reply.replace(/```json|```/g, "").trim();
    const replyjson = JSON.parse(cleaned);
    return replyjson;
}
export default chatboat;