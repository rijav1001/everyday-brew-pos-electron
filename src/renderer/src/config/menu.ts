import { MenuCategory, MenuItem } from "@renderer/types/menu";

export const MENU_CATEGORIES: MenuCategory[] = [
    {
        id: "hot-coffee",
        name: "Hot Coffee",
        icon: "coffee",
    },
    {
        id: "cold-coffee",
        name: "Cold Coffee",
        icon: "snowflake",
    },
    {
        id: "frappe",
        name: "Frappe",
        icon: "cup",
    },
    {
        id: "tea",
        name: "Tea",
        icon: "cup",
    },
    {
        id: "desserts",
        name: "Desserts",
        icon: "cookie",
    },
];

export const MENU_ITEMS: MenuItem[] = [
    {
        id: "americano",
        categoryId: "hot-coffee",
        name: "Americano",
        displayPrice: 140,
        gstRate: 5,
        available: true,
        addons: []
    },
    {
        id: "cappuccino",
        categoryId: "hot-coffee",
        name: "Cappuccino",
        displayPrice: 170,
        gstRate: 5,
        available: true,
        addons: [
            {
                id: "extra-shot",
                name: "Extra Shot",
                price: 30,
            },
        ]
    },
    {
        id: "spanish-latte",
        categoryId: "cold-coffee",
        name: "Spanish Latte",
        displayPrice: 220,
        gstRate: 5,
        available: true,
        addons: [
            {
                id: "extra-shot",
                name: "Extra Shot",
                price: 30,
            },
            {
                id: "oat-milk",
                name: "Oat Milk",
                price: 40,
            },
            {
                id: "vanilla",
                name: "Vanilla",
                price: 20,
            },
        ],
    },
    {
        id: "vanilla-frappe",
        categoryId: "frappe",
        name: "Vanilla Frappe",
        displayPrice: 240,
        gstRate: 5,
        available: true,
        addons: []
    },
    {
        id: "masala-tea",
        categoryId: "tea",
        name: "Masala Tea",
        displayPrice: 70,
        gstRate: 5,
        available: true,
        addons: []
    },
];