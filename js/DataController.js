const app = angular.module("Offer", []);
app.controller("DataController", ["$scope", function(t) {
    t.currYear = (new Date).getFullYear(), t.data = {
        url: "ez3-keto.com",
        phone: "1-877-252-9868",
        phones2: "1-877-253-1892",
        phoneSS:'X-XXX-XXX-XXXX',
        email: "admin@ez3-keto.com",
        emailS2: "admin@ez3-forskolin.com",
        returnAddress: {
            part1: "7071 Warner Ave #462, Huntington Beach, CA 92647, United States\n",
            part2: ""
        },
        processing: {
            express: 1.99,
            standard: {
                cost: 0,
                text: "FREE"
            }
        },
        rebill: {
            trialLength: {
                trialDays: 12,
                shipping: 4,
                total: 16,
                totalW: "sixteen",
                totals2: 16
            },
            initial: 45,
            autoShip: 30,
            autoShipW: "thirty"
        },
        rebill2: {
            trialLength: {
                trialDays: 12,
                shipping: 4,
                total: 16,
                totalW: "sixteen",
                totals2: 16
            },
            initial: 45,
            autoShip: 30,
            autoShipW: "thirty"
        }
    }, t.downsell = "no", t.product_extra = "ShippingInsMain", t.shippingCost = 0, t.shippingSave = 0, t.expressCost = 0, t.totalCost = 0, t.updateExpress = function(p) {
        t.expressCost = 1 == p ? t.data.processing.express : t.data.processing.standard.cost, t.updateTotal()
    }, t.updateShipping = function(p) {
        "yes" != p ? (t.shippingCost = t.S1.pricing.shipping.noDiscount, t.shippingSave = t.S1.pricing.shipping.savings.noDiscount) : (t.shippingCost = t.S1.pricing.shipping.discount, t.shippingSave = t.S1.pricing.shipping.savings.discount), t.updateTotal()
    }, t.updateTotal = function() {
        t.totalCost = t.shippingCost + t.expressCost
    }, t.updateDownsell = function(p) {
        t.downsell = p, t.updateShipping(p)
    }, t.S1 = {
        name: "CBD Hemp Oil",
        bottleImg: "product-S1.png",
        largeImg: "S1-large.png",
        threeImg: "product-S1-triple.png",
        pricing: {
            trial: 0,
            product: 90.76,
            shipping: {
                original: 9.95,
                savings: {
                    noDiscount: 5,
                    discount: 7
                },
                noDiscount: 4.95,
                discount: 2.9
            }
        },
        supply: 30,
        supplyW: "thirty",
        capsules: 60
    }, t.S2 = {
        name: "Ez³ Forskolin",
        bottleImg: "product-S2.png",
        pricing: {
            product: 88.44,
            shipping: {
                noDiscount: 5.95,
                discount: 2.99
            }
        },
        supply: 30,
        supplyW: "thirty",
        capsules: 60
    }, t.S3 = {
        name: "Trim Pulse Garcinia",
        bottleImg: "product-S3.png",
        pricing: {
            product: 32.99
        },
        supply: 30,
        supplyW: "thirty",
        capsules: 60
    }, t.rebill = function(t, p) {
        return t - t * p
    }
}]);