export interface Affiliate {
    id: number
    name: string
}

export interface Campaign {
    id: number
    name: string
}

export interface Click {
    id: number
    affiliate_id: number
    campaign_id: number
    click_id: string
    timestamp: string
    campaign_name: string
}

export interface Conversion {
    id: number
    click_id: number
    amount: string
    currency: string
    timestamp: string
    original_click_id: string
}

export interface AffiliateData {
    affiliate_id: number
    clicks: Click[]
    conversions: Conversion[]
    total_revenue: number
    total_clicks: number
    total_conversions: number
}