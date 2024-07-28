import { Product, Clothing, Appliace } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";
const firstObj = new Product({
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
        stars: 4.5,
        count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
});
const secondObj = new Product({
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
        stars: 4,
        count: 127,
    },
    priceCents: 2095,
    keywords: ["sports", "basketballs"],
});
const clothingObj = new Clothing({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
        stars: 4.5,
        count: 56,
    },
    priceCents: 799,
    keywords: ["tshirts", "apparel", "mens"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
})
const applianceObj = new Appliace({
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
        stars: 5,
        count: 2197,
    },
    priceCents: 1899,
    keywords: ["toaster", "kitchen", "appliances"],
    type: "appliance",
    instructionsLink: "images/appliance-instructions.png",
    warrentyLink: "images/appliance-warranty.png",
})
new describe("makes a new product", () => {
    it("checks the properties", () => {
        expect(firstObj.name).toEqual(
            "Black and Gray Athletic Cotton Socks - 6 Pairs"
        );
        expect(firstObj.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(firstObj.getStarsUrl()).toEqual(
            `images/ratings/rating-${firstObj.rating.stars * 10}.png`
        );
        expect(firstObj.getPrice()).toEqual(`$10.90`);
        expect(firstObj.extraInfoHTML()).toEqual("");
    });
    it("checks properties and methods for clothing", () => {
        expect(clothingObj.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack")
        expect(clothingObj.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(clothingObj.extraInfoHTML()).toContain(`
        <a target="_blank" href="images/clothing-size-chart.png" >
        Size Chart
        </a>
        `)
        expect(clothingObj.extraInfoHTML()).toContain(`Size Chart`)
        expect(clothingObj.sizeChartLink).toEqual("images/clothing-size-chart.png")
    });
    it("checks properties and methods of appliances", () => {
        expect(applianceObj.name).toEqual("2 Slot Toaster - Black")
        expect(applianceObj.instructionsLink).toEqual("images/appliance-instructions.png")
        expect(applianceObj.extraInfoHTML()).toContain(`
        <a target="_blank" href="${applianceObj.instructionsLink}">Instructions</a>
        <a target="_blank" href="${applianceObj.warrentyLink}" >Warrenty</a>
        `)
    })
});