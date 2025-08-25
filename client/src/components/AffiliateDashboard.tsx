import { format } from 'date-fns';
import { AffiliateData } from '../types';

interface AffiliateDashboardProps {
    affiliateData: AffiliateData | null;
    loading: boolean;
}

const AffiliateDashboard: React.FC<AffiliateDashboardProps> = ({ affiliateData, loading }) => {
    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!affiliateData) {
        return (
            <div className="text-center py-8 text-gray-500">
                No data available for this affiliate.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{affiliateData.total_clicks}</div>
                    <div className="text-sm text-blue-600">Total Clicks</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{affiliateData.total_conversions}</div>
                    <div className="text-sm text-green-600">Total Conversions</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {affiliateData.total_conversions > 0 
                        ? ((affiliateData.total_conversions / affiliateData.total_clicks) * 100).toFixed(2)
                        : '0'
                        }%
                    </div>
                    <div className="text-sm text-purple-600">Conversion Rate</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                        ${affiliateData.total_revenue.toFixed(2)}
                    </div>
                    <div className="text-sm text-yellow-600">Total Revenue</div>
                </div>
            </div>

            {/* Clicks Table */}
            <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Recent Clicks</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Click ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Campaign
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Timestamp
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {affiliateData.clicks.slice(0, 10).map((click) => (
                                <tr key={click.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {click.click_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {click.campaign_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(click.timestamp), 'MMM dd, yyyy HH:mm')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Conversions Table */}
            <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Recent Conversions</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Click ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Currency
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Timestamp
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {affiliateData.conversions.slice(0, 10).map((conversion) => (
                                <tr key={conversion.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {conversion.original_click_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {conversion.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {conversion.currency}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(conversion.timestamp), 'MMM dd, yyyy HH:mm')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AffiliateDashboard;