import axios from 'axios'

export const fetchAffiliates = async () => {
    try {
        const response = await axios.get('/api/affiliates')
        return response.data
    } catch (error) {
        console.error('Error fetching affiliates:', error)
        throw error
    }
}

export const fetchCampaigns = async () => {
    try {
        const response = await axios.get('/api/campaigns')
        return response.data
    } catch (error) {
        console.error('Error fetching campaigns:', error)
        throw error
    }
}

export const fetchAffiliateData = async (affiliateId: number) => {
    try {
        const response = await axios.get(`/api/affiliate/${affiliateId}`)
        return response.data
    } catch (error) {
        console.error('Error fetching affiliate data:', error)
        throw error
    }
}