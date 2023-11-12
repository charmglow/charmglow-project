export const jewelryCategories = [
    {
        title: 'All',
        value: 'all',
    },
    {
        title: 'Rings',
        value: 'rings',
    },
    {
        title: 'Necklaces',
        value: 'necklaces',
    },
    {
        title: 'Earrings',
        value: 'earrings',
    },
    {
        title: 'Bracelets',
        value: 'bracelets',
    },
    {
        title: 'Watches',
        value: 'watches',
    },
    {
        title: 'Anklets',
        value: 'anklets',
    },
    {
        title: 'Brooches and Pins',
        value: 'brooches-pins',
    },
    {
        title: 'Body Jewelry',
        value: 'body-jewelry',
    },
    {
        title: 'Jewelry Sets',
        value: 'jewelry-sets',
    },
    {
        title: 'Personalized Jewelry',
        value: 'personalized-jewelry',
    },
    {
        title: "Children's Jewelry",
        value: 'childrens-jewelry',
    },
    {
        title: 'Ethnic and Cultural Jewelry',
        value: 'ethnic-cultural-jewelry',
    },
    {
        title: 'Gemstone Jewelry',
        value: 'gemstone-jewelry',
    },
    {
        title: 'Pearl Jewelry',
        value: 'pearl-jewelry',
    },
    {
        title: 'Luxury Jewelry',
        value: 'luxury-jewelry',
    },
    {
        title: 'Vintage and Antique Jewelry',
        value: 'vintage-antique-jewelry',
    },
    {
        title: 'Custom Jewelry',
        value: 'custom-jewelry',
    },
    {
        title: 'Jewelry Care and Accessories',
        value: 'jewelry-care-accessories',
    },
    {
        title: 'Seasonal Jewelry',
        value: 'seasonal-jewelry',
    },
    {
        title: "Men's Jewelry",
        value: 'mens-jewelry',
    },
    {
        title: "Women's Jewelry",
        value: 'womens-jewelry',
    },
];

export function calculateFinalPrice(productPrice: number, discountPercentage: number) {
    // Ensure the input values are valid
    if (isNaN(productPrice) || isNaN(discountPercentage)) {
        return "Invalid input. Please enter valid numbers.";
    }

    // Calculate the discount amount
    var discountAmount = (productPrice * discountPercentage) / 100;

    // Calculate the final price after discount
    var finalPrice = productPrice - discountAmount;

    return finalPrice;
}