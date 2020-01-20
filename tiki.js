var totalOrders = 0;
var totalSpent = 0;
var pulling = true;

function getStatistics() {
	var orders = [];
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			orders = JSON.parse(this.responseText)['data'];
			totalOrders = orders.length;
			orders.forEach(order => {
				let tpa = order["grand_total"];
				totalSpent += tpa;
			});
			console.log("%cTổng đơn hàng đã giao: "+"%c"+moneyFormat(totalOrders), "font-size: 30px;","font-size: 30px; color:red");
			console.log("%cTổng chi tiêu: "+"%c"+moneyFormat(totalSpent)+"đ", "font-size: 30px;","font-size: 30px; color:red");
		}
	};
	xhttp.open("GET", "https://tiki.vn/api/v2/me/orders", true);
	xhttp.send();
}

function moneyFormat(number, fixed=0) {
	if(isNaN(number)) return 0;
	number = number.toFixed(fixed);
	let delimeter = ',';
	number += '';
	let rgx = /(\d+)(\d{3})/;
	while (rgx.test(number)) {
		number = number.replace(rgx, '$1' + delimeter + '$2');
	}
	return number;
}