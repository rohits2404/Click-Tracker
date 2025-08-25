export const generatePostbackUrl = (affiliateId: number) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/postback`
    return `${baseUrl}?affiliate_id=${affiliateId}&click_id={click_id}&amount={amount}&currency={currency}`
}

export const generateClickUrl = (affiliateId: number, campaignId: number) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/click`
    return `${baseUrl}?affiliate_id=${affiliateId}&campaign_id=${campaignId}&click_id={click_id}`
}