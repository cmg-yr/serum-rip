var mod_pagespeed_Dzr_7ReTNo = "kcart=function(){};kcart.prototype.construct=function(lander){\"use strict\";if(typeof lander!=='object'){console.log(\"1001: Cannot build cart without instance of lander\");return;}this.lander=lander;this.validator=lander.validator;this.defaultProduct=lander.defaultProduct;this.defaultShipProfile=lander.defaultShipProfile;this.products=lander.products;this.orderItems=lander.orderItems;this.sessionData={};this.totalsNodes={};this.profiles={};this.profiles.shipping=lander.shipProfiles;this.profiles.coupon=lander.coupons;this.profiles.taxes=lander.taxes;this.currency=lander.currencySymbol;this.cartDetail=document.getElementById('kcartDetail');this.cartWidgets=[];var nodes=document.getElementsByClassName(\"kcartWidget\");for(var i=0;i<nodes.length;i++){this.cartWidgets.push(nodes[i]);}this.cartTotals=[];nodes=document.getElementsByClassName(\"kcartTotals\");for(i=0;i<nodes.length;i++){this.cartTotals.push(nodes[i]);}this.upgradeCartDetail();this.upgradeAddToCartButtons();this.upgradeWidgets();this.upgradeCartTotals();this.upgradeExtraCheckoutProducts();};kcart.prototype.getProfile=function(name){\"use strict\";if(this.profiles[name]){return this.profiles[name];}console.log(\"getProfile could not find profile with name \"+name);return false;};kcart.prototype.sendAjaxRequest=function(url,params,callback){\"use strict\";return this.lander.sendAjaxRequest(url,params,callback);};kcart.prototype.ajaxCallMethod=function(method,params,cb1,cb2){\"use strict\";return this.lander.ajaxCallMethod(method,params,cb1,cb2);};kcart.prototype.displayWidget=function(){\"use strict\";var widgets=this.widgets;var success=function(html){console.log(widgets);for(var i in widgets){if(widgets[i]){widgets[i].innerHTML=html;}}};this.ajaxCallMethod(\"getWidget\",null,success);};kcart.prototype.displayCart=function(){\"use strict\";if(this.cartDetail){var kcart=this;var success=function(result){this.cartDetail.innerHTML=result.body;kcart.upgradeCartDetail();};this.ajaxCallMethod(\"getShoppingCart\",null,success);}};kcart.prototype.updateSession=function(items){items=items||this.getOrderItems();var params={};params.cartItems=items;params.cartItems=JSON.stringify(params.cartItems);var kcart=this;this.ajaxCallMethod(\"updateCart\",params,function(){kcart.displayWidget();});}\nkcart.prototype.upgradeCartTotals=function(){var classes=['kcartSubTotal','kcartShipTotal','kcartSalesTax','kcartDiscount','kcartInsurance','kcartGrandTotal'];for(i in classes){var name=classes[i];this.totalsNodes[name]=[];var nodes=document.getElementsByClassName(name);for(var n=0;n<nodes.length;n++)this.totalsNodes[name].push(nodes[n]);}}\nkcart.prototype.upgradeCartDetail=function(){if(!this.cartDetail)return;this.upgradeShopButtons();this.upgradeLineItems();}\nkcart.prototype.upgradeLineItems=function(){this.lineItems={};var container=this.cartDetail;var nodes=container.getElementsByClassName(\"kcartItem\");var kcart=this;for(var i=0;i<nodes.length;i++){var node=nodes[i];var productId=parseInt(node.getAttribute('productId'));this.lineItems[productId]={};var item=this.lineItems[productId];item.productId=productId;item.parentRow=node;this.lineItems[productId].getQty=function(){return parseInt(this.itemQty.innerHTML);};item.minusBtn=node.getElementsByClassName('kcartMinusBtn')[0];if(item.minusBtn){item.minusBtn.lineItem=item;item.minusBtn.onclick=function(){kcart.minusItem(this.lineItem.productId)};}item.plusBtn=node.getElementsByClassName('kcartPlusBtn')[0];if(item.plusBtn){item.plusBtn.lineItem=item;item.plusBtn.onclick=function(){kcart.plusItem(this.lineItem.productId)};}item.removeBtn=node.getElementsByClassName('kcartRemoveBtn')[0];if(item.removeBtn){item.removeBtn.lineItem=item;item.removeBtn.onclick=function(){kcart.removeItem(this.lineItem.productId)};}item.itemQty=node.getElementsByClassName('kcartItemQty')[0];item.itemQty.lineItem=item;}this.getOrderItems();}\nkcart.prototype.getOrderItems=function(){if(this.lander.pageType=='checkoutPage'){this.orderItems={};if(this.cartDetail){for(var i in this.lineItems){var item=this.lineItems[i];this.orderItems[i]=item.getQty();}}else{var productId=this.getValue('productId');if(!productId||!this.products[productId])productId=this.defaultProduct;if(this.lander.selectedProduct)productId=this.lander.selectedProduct;this.orderItems[productId]=1;var nodes=document.getElementsByClassName('kformCheckoutUpsell');for(var i=0;i<nodes.length;i++){var node=nodes[i];productId=node.value;var qty=node.getAttribute('quantity')||'1';if(!this.lander.products[productId])console.log(\"skipping checkout upsell with productId: \"+productId+\". Product not found. It may be necessary to update config.php.\");else if(node.checked)this.orderItems[productId]=qty;}}}return this.orderItems;}\nkcart.prototype.minusItem=function(productId){this.getOrderItems();var items=this.orderItems;if(items[productId]){if(items[productId]>1)items[productId]--;if(this.cartDetail){var itemQty=this.lineItems[productId].itemQty;itemQty.innerHTML=items[productId];}}this.updateSession(items);this.displayTotals();}\nkcart.prototype.plusItem=function(productId){var items=this.getOrderItems();if(items[productId]){items[productId]++;if(this.cartDetail){var itemQty=this.lineItems[productId].itemQty;itemQty.innerHTML=items[productId];}}this.updateSession();this.displayTotals();}\nkcart.prototype.removeItem=function(productId){console.log(productId);var items=this.getOrderItems();if(items[productId]){if(this.cartDetail){var node=this.lineItems[productId].parentRow;node.parentNode.removeChild(node);this.upgradeLineItems();}}this.updateSession();this.displayTotals();}\nkcart.prototype.upgradeAddToCartButtons=function(){var kcart=this;var nodes=document.getElementsByClassName(\"kcartAddToCartButton\");for(var i=0;i<nodes.length;i++){var node=nodes[i];node.addEventListener('click',function(){var productId=parseInt(this.getAttribute('productId'));var qty=parseInt(this.getAttribute('quantity'));kcart.addToCart(productId,qty);});}}\nkcart.prototype.upgradeShopButtons=function(){if(!this.cartDetail)return;var container=this.cartDetail;var nodes=container.getElementsByClassName(\"kcartShopButton\");for(var i=0;i<nodes.length;i++){var node=nodes[i];node.addEventListener('click',function(){var url=this.getAttribute('href');window.location=url;});}}\nkcart.prototype.upgradeWidgets=function(){this.widgets=[];var nodes=document.getElementsByClassName(\"kcartWidget\");for(var i=0;i<nodes.length;i++){var node=nodes[i];this.widgets.push(node);}}\nkcart.prototype.addToCart=function(productId,qty){var originalProductId=productId;productId=parseInt(productId);qty=parseInt(qty);if(isNaN(qty))qty=1;if(isNaN(productId)){console.log(\"could not add product, invalid productId: \"+originalProductId);return;}var items=this.getOrderItems();if(items[productId])items[productId]+=qty;else\nitems[productId]=qty;this.updateSession();}\nkcart.prototype.getValue=function(name){if(this.lander.getValue(name))return this.lander.getValue(name)\nelse if(this.lander.validator)return this.lander.validator.fetchFormValue(name);else if(this.sessionData[name])return this.sessionData[name];return false;}\nkcart.prototype.getShipAddress=function(){var address1=this.getValue('shipAddress1')||this.getValue('address1');var address2=this.getValue('shipAddress2')||this.getValue('address2');var city=this.getValue('shipCity')||this.getValue('city');var state=this.getValue('shipState')||this.getValue('state');var postalCode=this.getValue('shipPostalCode')||this.getValue('postalCode');var country=this.getValue('shipCountry')||this.getValue('country');return{address1:address1,address2:address2,city:city,state:state,postalCode:postalCode,country:country};}\nkcart.prototype.getShipProfile=function(){var profileId=this.getValue('shipProfileId');if(!profileId&&this.defaultShipProfile)profileId=this.defaultShipProfile;if(profileId&&this.profiles.shipping[profileId])return this.profiles.shipping[profileId];};kcart.prototype.getTaxRate=function(){var shipAddress=this.getShipAddress();var country=shipAddress.country;var state=shipAddress.state;var tax_key=country+'-'+state\nif(!this.profiles.taxes[tax_key])tax_key=country+'-*';return parseFloat(this.profiles.taxes[tax_key])||0;};kcart.prototype.getCardinalAuth=function(params){var deferred=new $.Deferred();var lander=this.lander;lander.setValue('JWTContainer','');lander.setValue('JWTReturn','');lander.setValue('CarSteps','');params=params||{};params.firstName=lander.getValue('firstName');params.lastName=lander.getValue('lastName');var shipAddress=lander.getValue('shipAddress1');var city=lander.getValue('shipCity');var postalCode=lander.getValue('shipPostalCode');var state=lander.getValue('shipState');var country=lander.getValue('shipCountry');if(shipAddress)params.shipAddress1=shipAddress;else\nparams.shipAddress1=lander.getValue('address1');if(city)params.shipCity=city;else\nparams.shipCity=lander.getValue('city');if(state)params.shipState=state;else\nparams.shipState=lander.getValue('state');if(postalCode)params.shipPostalCode=postalCode;else\nparams.shipPostalCode=lander.getValue('postalCode');if(country)params.shipCountry=country;else\nparams.shipCountry=lander.getValue('country');params.method='importAuth';if(!params.shipAddress1||!params.shipCity||!params.shipPostalCode||!params.shipState|!params.firstName)return;var loc=window.location.toString();params.errorRedirectsTo=loc.indexOf('?')>-1?loc.substr(0,loc.indexOf('?')):loc;if(lander.pageType==='checkoutPage'){params.orderItems=JSON.stringify(this.orderItems);}var success=function(result){lander.isProcessing=false;lander.setValue('JWTContainer',result);if(params.action==='AUTH'){Cardinal.configure({logging:{level:\"on\"}});Cardinal.setup(\"init\",{jwt:document.getElementById('JWTContainer').value});Cardinal.on('payments.setupComplete',function(){console.log('setup completed');});Cardinal.start(\"cca\",{OrderDetails:{OrderNumber:params.orderId,Amount:'2000',CurrencyCode:'840'},Consumer:{Account:{AccountNumber:params.cardNumber,ExpirationMonth:params.cardMonth,ExpirationYear:params.cardYear}}});Cardinal.on(\"payments.validated\",function(data,jwt){switch(data.ActionCode){case\"SUCCESS\":document.getElementById(\"JWTReturn\").value=jwt;var step='STEP2';document.getElementById(\"CarSteps\").value=step;return'SUCCESS';break;case\"NOACTION\":document.getElementById(\"JWTReturn\").value=jwt;var step='STEP2';document.getElementById(\"CarSteps\").value=step;return'SUCCESS';break;case\"FAILURE\":document.getElementById(\"JWTReturn\").value=jwt;var step='STEP2';document.getElementById(\"CarSteps\").value=step;return'SUCCESS';break;case\"ERROR\":document.getElementById(\"JWTReturn\").value=jwt;var step='STEP2';document.getElementById(\"CarSteps\").value=step;return'SUCCESS';break;}});}};var failure=function(result,code){lander.isProcessing=false;lander.hideProgressBar();kform.validator.triggerError(result);};lander.displayProgressBar('Getting 3DS Perms...');lander.ajaxCallMethod(params.method,params,success,failure);setTimeout(function(){deferred.resolve('SUCCESS');},15000)\nreturn deferred.promise();};kcart.prototype.getExternalTax=function(params){if(this.isProcessing){this.validator.triggerError('paymentProcessing');return false;}if(!this.lander.taxServiceId)return;var csymbol=this.currencySymbol;var lander=this.lander;params=params||{};params.firstName=lander.getValue('firstName');params.lastName=lander.getValue('lastName');var shipAddress=lander.getValue('shipAddress1');var city=lander.getValue('shipCity');var postalCode=lander.getValue('shipPostalCode');var state=lander.getValue('shipState');var country=lander.getValue('shipCountry');if(shipAddress)params.shipAddress1=shipAddress;else\nparams.shipAddress1=lander.getValue('address1');if(city)params.shipCity=city;else\nparams.shipCity=lander.getValue('city');if(state)params.shipState=state;else\nparams.shipState=lander.getValue('state');if(postalCode)params.shipPostalCode=postalCode;else\nparams.shipPostalCode=lander.getValue('postalCode');if(country)params.shipCountry=country;else\nparams.shipCountry=lander.getValue('country');params.method='importTax';params.taxExemption=lander.getValue('taxExemption');if(!params.shipAddress1||!params.shipCity||!params.shipPostalCode||!params.shipState|!params.firstName)return;var loc=window.location.toString();params.errorRedirectsTo=loc.indexOf('?')>-1?loc.substr(0,loc.indexOf('?')):loc;if(lander.pageType==='checkoutPage'){params.orderItems=JSON.stringify(this.orderItems);}lander.isProcessing=true;var success=function(result){lander.isProcessing=false;lander.hideProgressBar();cart=lander.cart;cart.grandTotal-=cart.salesTax;cart.salesTax=parseFloat(result);cart.grandTotal+=cart.salesTax;for(var cls in cart.totalsNodes){var name=cls.substr(5);name=name.substr(0,1).toLowerCase()+name.substr(1);var amount=cart[name];for(var i in cart.totalsNodes[cls]){var node=cart.totalsNodes[cls][i];node.innerHTML=cart.currency+amount.toFixed(2);if(name=='discount'||name=='insurance'){if(node.parentNode.tagName=='TR')node.parentNode.style.display=amount>0?'table-row':'none';}}}};var failure=function(result,code){lander.isProcessing=false;lander.getTax=false;lander.hideProgressBar();kform.validator.triggerError(result);};lander.displayProgressBar('Calculating sales tax...');lander.ajaxCallMethod(params.method,params,success,failure);return false;};kcart.prototype.getInsurance=function(){return this.getValue('insureShipment')?parseFloat(this.lander.insureShipPrice):0;};kcart.prototype.getMicroTime=function(){return(new Date).getTime()/1000;}\nkcart.prototype.displayTotals=function(){this.calculateTotals();for(var cls in this.totalsNodes){var name=cls.substr(5);name=name.substr(0,1).toLowerCase()+name.substr(1);var amount=this[name];for(var i in this.totalsNodes[cls]){var node=this.totalsNodes[cls][i];node.innerHTML=this.currency+amount.toFixed(2);if(name=='discount'||name=='insurance'){if(node.parentNode.tagName=='TR')node.parentNode.style.display=amount>0?'table-row':'none';}}}}\nkcart.prototype.calculateTotals=function(){this.subTotal=0.00;this.salesTax=0.00;this.shipTotal=0.00;this.grandTotal=0.00;this.discount=0.00;this.insurance=0.00;var items=this.getOrderItems();var products=this.getProducts();var shipProfile=this.getShipProfile();var taxRate=this.getTaxRate();this.insurance=this.getInsurance();for(var i in items){var qty=items[i];var prod=products[i];this.subTotal+=parseFloat(prod.price)*qty;this.shipTotal+=parseFloat(prod.shipPrice)*qty;}if(shipProfile){if(shipProfile.applyEntireOrder&&shipProfile.matchedShipPrice){if(shipProfile.isUpcharge)this.shipTotal+=parseFloat(shipProfile.matchedShipPrice);else\nthis.shipTotal=parseFloat(shipProfile.matchedShipPrice);}var freeShipThreshold=parseFloat(shipProfile.freeShipThreshold);if(freeShipThreshold>0&&this.subTotal>=freeShipThreshold)this.shipTotal=0;}var taxable=this.subTotal;var couponCode=this.getValue('couponCode')?this.getValue('couponCode'):null;var campaignId=this.campaignId;var coupons=this.profiles.coupon;if(couponCode)var discounts=this.getDiscounts(couponCode,items,coupons);else\nvar discounts=false;var couponsDiv=document.getElementById(\"orderCoupons\");if(discounts){var orderPriceTotal=this.subTotal;var orderShipTotal=this.shipTotal;var discountPrice=0;for(var campaignProductId in discounts.productDiscounts){var disc=discounts.productDiscounts[campaignProductId];var inCart=items[campaignProductId];var itm=products[campaignProductId];if(inCart){var basePrice=parseFloat(itm.price);var baseShipping=parseFloat(itm.shipPrice);var priceDisc=basePrice<=disc.priceFlat?basePrice:disc.priceFlat;var shipDisc=baseShipping<=disc.shipFlat?baseShipping:disc.shipFlat;priceDisc+=disc.pricePerc*(basePrice-priceDisc);shipDisc+=disc.shipPerc*(baseShipping-shipDisc);this.discount+=shipDisc+priceDisc;taxable-=priceDisc;orderPriceTotal-=priceDisc;orderShipTotal-=shipDisc;}}disc=discounts.orderDiscounts;priceDisc=orderPriceTotal<=disc.priceFlat?0:disc.priceFlat;shipDisc=orderShipTotal<=disc.shipFlat?0:disc.shipFlat;priceDisc+=disc.pricePerc*(orderPriceTotal-priceDisc);shipDisc+=disc.shipPerc*(orderShipTotal-shipDisc);this.discount+=priceDisc+shipDisc;taxable-=priceDisc;if(couponsDiv){couponsDiv.innerHTML=discounts.coupMessage;couponsDiv.style.display=\"block\";}this.lander.setValue('couponCode',discounts.couponCode);}else{if(couponsDiv)couponsDiv.innerHTML='';this.lander.setValue('couponCode','');}if(this.lander.autoTax)this.getExternalTax();else\nthis.salesTax=taxRate*taxable;this.grandTotal=this.subTotal+this.shipTotal+this.salesTax-this.discount+this.insurance;return{subTotal:this.subTotal,shipTotal:this.shipTotal,salesTax:this.salesTax,discount:this.discount,insurance:this.insurance};};kcart.prototype.getDiscounts=function(couponCode,items,coupons){var ret={couponCode:[],orderDiscounts:{priceFlat:0,pricePerc:0,shipFlat:0,shipPerc:0},productDiscounts:{},coupons:[],coupMessage:''};var cCodes=couponCode.trim().toUpperCase().split(',');var couponCount=0;var obj,flatDiscount,percDiscount;for(var i in cCodes){var code=cCodes[i];if(!coupons[code])continue;coupon=coupons[code];flatDiscount=coupon.couponDiscountPrice===null?0:parseFloat(coupon.couponDiscountPrice);percDiscount=coupon.couponDiscountPerc===null?0:parseFloat(coupon.couponDiscountPerc);if(coupon.couponMax&&couponCount>=coupon.couponMax)break;if(!coupon.campaignProductId){obj=ret.orderDiscounts;}else{if(!items[coupon.campaignProductId]){continue;}if(!ret.productDiscounts[coupon.campaignProductId])ret.productDiscounts[coupon.campaignProductId]={priceFlat:0,pricePerc:0,shipFlat:0,shipPerc:0};obj=ret.productDiscounts[coupon.campaignProductId];}ret.coupMessage+=\"<span style='color:green;font-weight:bold;'>\"+code+\"</span> \";isPerc=percDiscount>flatDiscount;var discount=flatDiscount+percDiscount;if(isPerc)discount=(parseFloat(discount)*100).toString()+'%';var products=this.getProducts();if(coupon.campaignProductId)var coupProd=products[coupon.campaignProductId].name;ret.coupMessage+=discount+\" off \"+(coupon.applyTo=='SHIPPING'?'shipping ':'')+\"on \"+(coupon.campaignProductId?coupProd:\"Order\")+\"<br>\";if(coupon.applyTo=='BASE_PRICE'){obj.priceFlat+=flatDiscount;obj.pricePerc+=percDiscount;}else{obj.shipFlat+=flatDiscount;obj.shipPerc+=percDiscount;}if(obj.pricePerc>100)obj.pricePerc=100;if(obj.shipPerc>100)obj.shipPerc=100;ret.coupons.push(coupon);ret.couponCode.push(code);couponCount++;}if(couponCount==0)return false;ret.couponCode=ret.couponCode.join();return ret;}\nkcart.prototype.getProducts=function(){this.profileShipPrice=0;var products=JSON.parse(JSON.stringify(this.products));var profile=this.getShipProfile();if(!profile)return products;profile.matchedShipPrice=null;var shipAddress=this.getShipAddress();var shipCountry=shipAddress.country;var shipState=shipAddress.state;var shipContinent=this.lander.config.continents[shipCountry];if(profile.applyEntireOrder){var matchRule=null;var maxRStrength=0;var rStrength;for(var i in profile.rules){rStrength=0;var rule=profile.rules[i];if(rule.region){if(rule.region.substr(0,4)=='REG_'){if(rule.region.substr(4,2)!=shipContinent)continue;rStrength=1;}else{if(rule.region==shipCountry){rStrength=2;if(rule.state){if(rule.state==shipState)rStrength=3;else\ncontinue;}}else\ncontinue;}}if(rStrength>=maxRStrength){maxRStrength=rStrength;matchRule=rule;}else\ncontinue;}if(matchRule)profile.matchedShipPrice=matchRule.shipPrice;}else{for(var i in products){var prod=products[i];var productId=prod.productId;var matchRule=null;var maxPStrength=0;var maxRStrength=0;for(var i in profile.rules){var rule=profile.rules[i];var pStrength=0;var rStrength=0;if(rule.region){if(rule.region.substr(0,4)=='REG_'){if(rule.region.substr(4,2)!=shipContinent)continue;rStrength=1;}else{if(rule.region==shipCountry){rStrength=2;if(rule.state){if(rule.state==shipState)rStrength=3;else\ncontinue;}}else\ncontinue;}}if(rStrength>=maxRStrength)maxRStrength=rStrength;else\ncontinue;if(rule.productTypeSelect=='SINGLE'&&productId==rule.campaignProductId)pStrength=5;else if(rule.productTypeSelect=='CATEGORY'&&prod.productCategoryId==rule.productCategoryId)pStrength=4;else if(rule.productTypeSelect=='OFFERS'&&prod.productType=='OFFER')pStrength=3;else if(rule.productTypeSelect=='UPSELLS'&&prod.productType=='UPSALE')pStrength=2;else if(rule.productTypeSelect=='PRODUCTS')pStrength=1;if(pStrength>=maxPStrength){matchRule=rule;maxPStrength=pStrength;}}var shipPrice=parseFloat(products[productId].shipPrice);if(matchRule){var profileShipPrice=parseFloat(matchRule.shipPrice);if(profile.isUpcharge)shipPrice+=profileShipPrice;else\nshipPrice=profileShipPrice;prod.shipPrice=shipPrice;}}}if(profile.highestShipPriceOnly){var maxShipPrid=null;var maxShipPrice=0;for(var i in products){var prod=products[i];var shipPrice=parseFloat(prod.shipPrice);if(shipPrice>maxShipPrice){maxShipPrid=i;maxShipPrice=shipPrice;}}for(var i in products){if(i!=maxShipPrid)products[i].shipPrice=0;}}return products;}\nkcart.prototype.selectProduct=function(productId){if(kform.selectedProduct){var curVal=kform.selectedProduct;if(curVal==productId)return;if(kform.productSelectNodes){var node=kform.productSelectNodes[curVal];if(node){node.className=node.className.replace(/kform_selectedProduct/,\"\");node.parentBox.className=node.parentBox.className.replace(/kform_selectedProduct/,\"\");}}}if(kform.productSelectNodes){var node;if(node=kform.productSelectNodes[productId]){kform.selectedProduct=productId;node.className+=\" kform_selectedProduct\";node.parentBox.className+=\" kform_selectedProduct\";}}kform.storeValue('selectedProduct',productId);if(typeof kform_userSelectProduct=='function')kform_userSelectProduct(productId);this.displayTotals();};kcart.prototype.upgradeProductSelector=function(){var nodes=document.getElementsByClassName('kform_productSelect');var len=nodes.length;if(len==0)return;this.productSelectNodes={};var defaultProductIsOption=false;for(var i=0;i<len;i++){var node=nodes[i];var productId=node.getAttribute('productId');if(!productId)alert(\"kformError: productSelect button must have the productId attribute\");node.productId=productId;var parent=node;var foundParent=false;while(parent=parent.parentNode){if(typeof parent!='object')break;if(typeof parent.className=='undefined')continue;if(parent.className.indexOf(\"kform_productBox\")>-1){node.parentBox=parent;foundParent=true;}}if(!foundParent)alert(\"kformError: productSelect button must be a child of an element with the kform_productBox className\");this.productSelectNodes[productId]=node;if(!this.products[productId])alert(\"kformError: productSelect button has a productId value of \"+productId+\" but that productId does not exist in this campaign\");if(!this.hasInput('productSelector')){var input=document.createElement('input');input.type='hidden';input.name='productSelector';this.node.appendChild(input);this.inputs['productSelector']=input;}if(productId==this.defaultProduct)defaultProductIsOption=true;node.addEventListener('click',function(){kform.selectProduct(this.productId);});}if(!defaultProductIsOption)alert(\"kformError: default productId is \"+this.defaultProduct+\" but this option does not exist in the productSelector\");var curProd=this.fetchValue('selectedProduct');if(!curProd)curProd=this.defaultProduct;this.selectProduct(curProd);};kcart.prototype.upgradeExtraCheckoutProducts=function(){var nodes=document.getElementsByClassName('kformCheckoutUpsell');var len=nodes.length;if(len==0)return;var cart=this;for(var i=0;i<len;i++){var node=nodes[i];if(node.type=='checkbox'){var upsellId=node.value;if(!this.products[upsellId])alert(\"kformError: upsell checkbox has an value of \"+upsellId+\" but that productId does not exist in this campaign\");node.addEventListener('click',function(){cart.displayTotals()});}}}";
var mod_pagespeed_FHr38ay35g = "(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory():typeof define==='function'&&define.amd?define(factory):(global.SignaturePad=factory());}(this,(function(){'use strict';function Point(x,y,time){this.x=x;this.y=y;this.time=time||new Date().getTime();}Point.prototype.velocityFrom=function(start){return this.time!==start.time?this.distanceTo(start)/(this.time-start.time):1;};Point.prototype.distanceTo=function(start){return Math.sqrt(Math.pow(this.x-start.x,2)+Math.pow(this.y-start.y,2));};Point.prototype.equals=function(other){return this.x===other.x&&this.y===other.y&&this.time===other.time;};function Bezier(startPoint,control1,control2,endPoint){this.startPoint=startPoint;this.control1=control1;this.control2=control2;this.endPoint=endPoint;}Bezier.prototype.length=function(){var steps=10;var length=0;var px=void 0;var py=void 0;for(var i=0;i<=steps;i+=1){var t=i/steps;var cx=this._point(t,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x);var cy=this._point(t,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(i>0){var xdiff=cx-px;var ydiff=cy-py;length+=Math.sqrt(xdiff*xdiff+ydiff*ydiff);}px=cx;py=cy;}return length;};Bezier.prototype._point=function(t,start,c1,c2,end){return start*(1.0-t)*(1.0-t)*(1.0-t)+3.0*c1*(1.0-t)*(1.0-t)*t+3.0*c2*(1.0-t)*t*t+end*t*t*t;};function throttle(func,wait,options){var context,args,result;var timeout=null;var previous=0;if(!options)options={};var later=function later(){previous=options.leading===false?0:Date.now();timeout=null;result=func.apply(context,args);if(!timeout)context=args=null;};return function(){var now=Date.now();if(!previous&&options.leading===false)previous=now;var remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0||remaining>wait){if(timeout){clearTimeout(timeout);timeout=null;}previous=now;result=func.apply(context,args);if(!timeout)context=args=null;}else if(!timeout&&options.trailing!==false){timeout=setTimeout(later,remaining);}return result;};}function SignaturePad(canvas,options){var self=this;var opts=options||{};this.velocityFilterWeight=opts.velocityFilterWeight||0.7;this.minWidth=opts.minWidth||0.5;this.maxWidth=opts.maxWidth||2.5;this.throttle='throttle'in opts?opts.throttle:16;this.minDistance='minDistance'in opts?opts.minDistance:5;if(this.throttle){this._strokeMoveUpdate=throttle(SignaturePad.prototype._strokeUpdate,this.throttle);}else{this._strokeMoveUpdate=SignaturePad.prototype._strokeUpdate;}this.dotSize=opts.dotSize||function(){return(this.minWidth+this.maxWidth)/2;};this.penColor=opts.penColor||'black';this.backgroundColor=opts.backgroundColor||'rgba(0,0,0,0)';this.onBegin=opts.onBegin;this.onEnd=opts.onEnd;this._canvas=canvas;this._ctx=canvas.getContext('2d');this.clear();this._handleMouseDown=function(event){if(event.which===1){self._mouseButtonDown=true;self._strokeBegin(event);}};this._handleMouseMove=function(event){if(self._mouseButtonDown){self._strokeMoveUpdate(event);}};this._handleMouseUp=function(event){if(event.which===1&&self._mouseButtonDown){self._mouseButtonDown=false;self._strokeEnd(event);}};this._handleTouchStart=function(event){if(event.targetTouches.length===1){var touch=event.changedTouches[0];self._strokeBegin(touch);}};this._handleTouchMove=function(event){event.preventDefault();var touch=event.targetTouches[0];self._strokeMoveUpdate(touch);};this._handleTouchEnd=function(event){var wasCanvasTouched=event.target===self._canvas;if(wasCanvasTouched){event.preventDefault();self._strokeEnd(event);}};this.on();}SignaturePad.prototype.clear=function(){var ctx=this._ctx;var canvas=this._canvas;ctx.fillStyle=this.backgroundColor;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillRect(0,0,canvas.width,canvas.height);this._data=[];this._reset();this._isEmpty=true;};SignaturePad.prototype.fromDataURL=function(dataUrl){var _this=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var image=new Image();var ratio=options.ratio||window.devicePixelRatio||1;var width=options.width||this._canvas.width/ratio;var height=options.height||this._canvas.height/ratio;this._reset();image.src=dataUrl;image.onload=function(){_this._ctx.drawImage(image,0,0,width,height);};this._isEmpty=false;};SignaturePad.prototype.toDataURL=function(type){var _canvas;switch(type){case'image/svg+xml':return this._toSVG();default:for(var _len=arguments.length,options=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){options[_key-1]=arguments[_key];}return(_canvas=this._canvas).toDataURL.apply(_canvas,[type].concat(options));}};SignaturePad.prototype.on=function(){this._handleMouseEvents();this._handleTouchEvents();};SignaturePad.prototype.off=function(){this._canvas.removeEventListener('mousedown',this._handleMouseDown);this._canvas.removeEventListener('mousemove',this._handleMouseMove);document.removeEventListener('mouseup',this._handleMouseUp);this._canvas.removeEventListener('touchstart',this._handleTouchStart);this._canvas.removeEventListener('touchmove',this._handleTouchMove);this._canvas.removeEventListener('touchend',this._handleTouchEnd);};SignaturePad.prototype.isEmpty=function(){return this._isEmpty;};SignaturePad.prototype._strokeBegin=function(event){this._data.push([]);this._reset();this._strokeUpdate(event);if(typeof this.onBegin==='function'){this.onBegin(event);}};SignaturePad.prototype._strokeUpdate=function(event){var x=event.clientX;var y=event.clientY;var point=this._createPoint(x,y);var lastPointGroup=this._data[this._data.length-1];var lastPoint=lastPointGroup&&lastPointGroup[lastPointGroup.length-1];var isLastPointTooClose=lastPoint&&point.distanceTo(lastPoint)<this.minDistance;if(!(lastPoint&&isLastPointTooClose)){var _addPoint=this._addPoint(point),curve=_addPoint.curve,widths=_addPoint.widths;if(curve&&widths){this._drawCurve(curve,widths.start,widths.end);}this._data[this._data.length-1].push({x:point.x,y:point.y,time:point.time,color:this.penColor});}};SignaturePad.prototype._strokeEnd=function(event){var canDrawCurve=this.points.length>2;var point=this.points[0];if(!canDrawCurve&&point){this._drawDot(point);}if(point){var lastPointGroup=this._data[this._data.length-1];var lastPoint=lastPointGroup[lastPointGroup.length-1];if(!point.equals(lastPoint)){lastPointGroup.push({x:point.x,y:point.y,time:point.time,color:this.penColor});}}if(typeof this.onEnd==='function'){this.onEnd(event);}};SignaturePad.prototype._handleMouseEvents=function(){this._mouseButtonDown=false;this._canvas.addEventListener('mousedown',this._handleMouseDown);this._canvas.addEventListener('mousemove',this._handleMouseMove);document.addEventListener('mouseup',this._handleMouseUp);};SignaturePad.prototype._handleTouchEvents=function(){this._canvas.style.msTouchAction='none';this._canvas.style.touchAction='none';this._canvas.addEventListener('touchstart',this._handleTouchStart);this._canvas.addEventListener('touchmove',this._handleTouchMove);this._canvas.addEventListener('touchend',this._handleTouchEnd);};SignaturePad.prototype._reset=function(){this.points=[];this._lastVelocity=0;this._lastWidth=(this.minWidth+this.maxWidth)/2;this._ctx.fillStyle=this.penColor;};SignaturePad.prototype._createPoint=function(x,y,time){var rect=this._canvas.getBoundingClientRect();return new Point(x-rect.left,y-rect.top,time||new Date().getTime());};SignaturePad.prototype._addPoint=function(point){var points=this.points;var tmp=void 0;points.push(point);if(points.length>2){if(points.length===3)points.unshift(points[0]);tmp=this._calculateCurveControlPoints(points[0],points[1],points[2]);var c2=tmp.c2;tmp=this._calculateCurveControlPoints(points[1],points[2],points[3]);var c3=tmp.c1;var curve=new Bezier(points[1],c2,c3,points[2]);var widths=this._calculateCurveWidths(curve);points.shift();return{curve:curve,widths:widths};}return{};};SignaturePad.prototype._calculateCurveControlPoints=function(s1,s2,s3){var dx1=s1.x-s2.x;var dy1=s1.y-s2.y;var dx2=s2.x-s3.x;var dy2=s2.y-s3.y;var m1={x:(s1.x+s2.x)/2.0,y:(s1.y+s2.y)/2.0};var m2={x:(s2.x+s3.x)/2.0,y:(s2.y+s3.y)/2.0};var l1=Math.sqrt(dx1*dx1+dy1*dy1);var l2=Math.sqrt(dx2*dx2+dy2*dy2);var dxm=m1.x-m2.x;var dym=m1.y-m2.y;var k=l2/(l1+l2);var cm={x:m2.x+dxm*k,y:m2.y+dym*k};var tx=s2.x-cm.x;var ty=s2.y-cm.y;return{c1:new Point(m1.x+tx,m1.y+ty),c2:new Point(m2.x+tx,m2.y+ty)};};SignaturePad.prototype._calculateCurveWidths=function(curve){var startPoint=curve.startPoint;var endPoint=curve.endPoint;var widths={start:null,end:null};var velocity=this.velocityFilterWeight*endPoint.velocityFrom(startPoint)+(1-this.velocityFilterWeight)*this._lastVelocity;var newWidth=this._strokeWidth(velocity);widths.start=this._lastWidth;widths.end=newWidth;this._lastVelocity=velocity;this._lastWidth=newWidth;return widths;};SignaturePad.prototype._strokeWidth=function(velocity){return Math.max(this.maxWidth/(velocity+1),this.minWidth);};SignaturePad.prototype._drawPoint=function(x,y,size){var ctx=this._ctx;ctx.moveTo(x,y);ctx.arc(x,y,size,0,2*Math.PI,false);this._isEmpty=false;};SignaturePad.prototype._drawCurve=function(curve,startWidth,endWidth){var ctx=this._ctx;var widthDelta=endWidth-startWidth;var drawSteps=Math.floor(curve.length());ctx.beginPath();for(var i=0;i<drawSteps;i+=1){var t=i/drawSteps;var tt=t*t;var ttt=tt*t;var u=1-t;var uu=u*u;var uuu=uu*u;var x=uuu*curve.startPoint.x;x+=3*uu*t*curve.control1.x;x+=3*u*tt*curve.control2.x;x+=ttt*curve.endPoint.x;var y=uuu*curve.startPoint.y;y+=3*uu*t*curve.control1.y;y+=3*u*tt*curve.control2.y;y+=ttt*curve.endPoint.y;var width=startWidth+ttt*widthDelta;this._drawPoint(x,y,width);}ctx.closePath();ctx.fill();};SignaturePad.prototype._drawDot=function(point){var ctx=this._ctx;var width=typeof this.dotSize==='function'?this.dotSize():this.dotSize;ctx.beginPath();this._drawPoint(point.x,point.y,width);ctx.closePath();ctx.fill();};SignaturePad.prototype._fromData=function(pointGroups,drawCurve,drawDot){for(var i=0;i<pointGroups.length;i+=1){var group=pointGroups[i];if(group.length>1){for(var j=0;j<group.length;j+=1){var rawPoint=group[j];var point=new Point(rawPoint.x,rawPoint.y,rawPoint.time);var color=rawPoint.color;if(j===0){this.penColor=color;this._reset();this._addPoint(point);}else if(j!==group.length-1){var _addPoint2=this._addPoint(point),curve=_addPoint2.curve,widths=_addPoint2.widths;if(curve&&widths){drawCurve(curve,widths,color);}}else{}}}else{this._reset();var _rawPoint=group[0];drawDot(_rawPoint);}}};SignaturePad.prototype._toSVG=function(){var _this2=this;var pointGroups=this._data;var canvas=this._canvas;var ratio=Math.max(window.devicePixelRatio||1,1);var minX=0;var minY=0;var maxX=canvas.width/ratio;var maxY=canvas.height/ratio;var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttributeNS(null,'width',canvas.width);svg.setAttributeNS(null,'height',canvas.height);this._fromData(pointGroups,function(curve,widths,color){var path=document.createElement('path');if(!isNaN(curve.control1.x)&&!isNaN(curve.control1.y)&&!isNaN(curve.control2.x)&&!isNaN(curve.control2.y)){var attr='M '+curve.startPoint.x.toFixed(3)+','+curve.startPoint.y.toFixed(3)+' '+('C '+curve.control1.x.toFixed(3)+','+curve.control1.y.toFixed(3)+' ')+(curve.control2.x.toFixed(3)+','+curve.control2.y.toFixed(3)+' ')+(curve.endPoint.x.toFixed(3)+','+curve.endPoint.y.toFixed(3));path.setAttribute('d',attr);path.setAttribute('stroke-width',(widths.end*2.25).toFixed(3));path.setAttribute('stroke',color);path.setAttribute('fill','none');path.setAttribute('stroke-linecap','round');svg.appendChild(path);}},function(rawPoint){var circle=document.createElement('circle');var dotSize=typeof _this2.dotSize==='function'?_this2.dotSize():_this2.dotSize;circle.setAttribute('r',dotSize);circle.setAttribute('cx',rawPoint.x);circle.setAttribute('cy',rawPoint.y);circle.setAttribute('fill',rawPoint.color);svg.appendChild(circle);});var prefix='data:image/svg+xml;base64,';var header='<svg'+' xmlns=\"http://www.w3.org/2000/svg\"'+' xmlns:xlink=\"http://www.w3.org/1999/xlink\"'+(' viewBox=\"'+minX+' '+minY+' '+maxX+' '+maxY+'\"')+(' width=\"'+maxX+'\"')+(' height=\"'+maxY+'\"')+'>';var body=svg.innerHTML;if(body===undefined){var dummy=document.createElement('dummy');var nodes=svg.childNodes;dummy.innerHTML='';for(var i=0;i<nodes.length;i+=1){dummy.appendChild(nodes[i].cloneNode(true));}body=dummy.innerHTML;}var footer='</svg>';var data=header+body+footer;return prefix+btoa(data);};SignaturePad.prototype.fromData=function(pointGroups){var _this3=this;this.clear();this._fromData(pointGroups,function(curve,widths){return _this3._drawCurve(curve,widths.start,widths.end);},function(rawPoint){return _this3._drawDot(rawPoint);});this._data=pointGroups;};SignaturePad.prototype.toData=function(){return this._data;};return SignaturePad;})));";