export const generatePostbackUrl = (affiliateId: number) => {
    const baseUrl = 'http://localhost:5000/postback'
    return `${baseUrl}?affiliate_id=${affiliateId}&click_id={click_id}&amount={amount}&currency={currency}`
}

export const generateClickUrl = (affiliateId: number, campaignId: number) => {
    const baseUrl = 'http://localhost:5000/click'
    return `${baseUrl}?affiliate_id=${affiliateId}&campaign_id=${campaignId}&click_id={click_id}`
}