const HowItWorks = () => (
    <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">How It Works</h2>
        <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">1</div>
                <div>
                    <strong>Click Tracking:</strong> When users click your affiliate links, the system stores the click with your affiliate ID, campaign ID, and a unique click ID.
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium">2</div>
                <div>
                    <strong>Postback:</strong> When conversions happen, advertisers send a postback request to your unique URL with the click ID, amount, and currency.
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium">3</div>
                <div>
                    <strong>Dashboard:</strong> View all your clicks, conversions, and revenue in real-time through this dashboard.
                </div>
            </div>
        </div>
    </div>
);

export default HowItWorks;