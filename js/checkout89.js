function unselect_payment_methods()
{
    var selected_payment_methods = document.getElementsByClassName("payment-method-title field choice selected");
    if (selected_payment_methods.length > 0)
    {
        var selected_payment_element  = selected_payment_methods.item(0);
        selected_payment_element.className = "payment-method-title field choice";
    }
}


setInterval(control_quote, 300000);
function get_product_json()
{
    var arr = [];
    var pname = document.getElementById("inp_pname").value;
    var knm = 0;
    for (var i = 0; i < 30; i++) 
    {
        var content_id = "div_content_" + i;
        var label_id   = "div_label_" + i;
        var label_display = "";
        
        if (document.getElementById(label_id))
        {
            label_display = document.getElementById(label_id).style.display;
        }

        if (document.getElementById(content_id) && label_display == "block")
        {
            var cards = document.getElementById(content_id).getElementsByClassName("card");
            if (cards.length == 0) 
            {
                var width = 0;
                var height = 0;
                var amount = 1;
                
                if (document.getElementById("inp_width"))
                {
                    width = document.getElementById("inp_width").value;
                }
                if (document.getElementById("inp_height"))
                {
                    height = document.getElementById("inp_height").value;
                }
                if (document.getElementById("inp_amount"))
                {
                    amount = document.getElementById("inp_amount").value;
                }
          
                var new_arr = new Object();
                new_arr.pname = pname;
                new_arr.level = i;
                new_arr.opt_id = "";
                new_arr.value1 = width;
                new_arr.value2 = height;
                new_arr.value3 = amount;
                new_arr.value4 = ""; 
                new_arr.value5 = "";
            
                arr.push(new_arr);
                knm = i;
            } 
            else 
            {
                var selected_item = document.getElementById(content_id).getElementsByClassName("selected")
                if (selected_item.length > 0) 
                {
                    selected_item = selected_item.item(0);
                    var onclick_str = selected_item.getAttribute("onclick");

                    if (onclick_str) 
                    {
                        var splitt = onclick_str.split(",");
                        var selected_id = splitt[2];
                        var selected_knm = splitt[6];
                            
                        var label_left_str = "";
                        var label_right_str = "";
                            
                        if (document.getElementById("a_text2_" + i))
                        {
                            label_left_str = document.getElementById("a_text2_" + i).innerText;
                            label_right_str = document.getElementById("a_text_" + i).innerText;
                        }
              
                        var new_arr = new Object();
                        new_arr.pname = pname;
                        new_arr.level = i;
                        new_arr.opt_id = selected_id;
                        new_arr.value1 = "";
                        new_arr.value2 = "";
                        new_arr.value3 = "";
                        new_arr.value4 = label_left_str;
                        new_arr.value5 = label_right_str;
                
                        arr.push(new_arr);
                        knm = i;
                    } 
                    else 
                    {
                        var button_count = selected_item.getElementsByTagName("button").length;
                        if (button_count > 0) 
                        {
                            var button_element = selected_item.getElementsByTagName("button").item(0);
                            var inp_element = selected_item.getElementsByTagName("input").item(0);
                            var button_onclick_str = button_element.getAttribute("onclick");
                    
                            var splitt = button_onclick_str.split(",");
                            var selected_id = splitt[3];
                                  
                            var selected_knm = splitt[6];
                            var label_left_str = "";
                            var label_right_str = "";
                      
                            if (document.getElementById("a_text2_" + i))
                            {
                                label_left_str = document.getElementById("a_text2_" + i).innerText;
                                label_right_str = document.getElementById("a_text_" + i).innerText;
                            }
                      
        
                            var new_arr = new Object();
                            new_arr.pname = pname;
                            new_arr.level = i;
                            new_arr.opt_id = selected_id;
                            new_arr.value1 = inp_element.value.trim();
                            new_arr.value2 = "";
                            new_arr.value3 = "";
                            new_arr.value4 = label_left_str;
                            new_arr.value5 = label_right_str;
                
                            arr.push(new_arr);
                            knm = i;
                        }
                    }
                }
            }

            var accessories_divs = document.getElementById("div_product_accessories").getElementsByClassName("selected");
            if (accessories_divs.length > 0) 
            {
                for (var j = 0; j < accessories_divs.length; j++) 
                {
                    var option_id = accessories_divs.item(j).id;
                    option_id = option_id.replace("div_acs_", "");
        
                    var input = accessories_divs.item(j).getElementsByTagName("input");
                    if (input.length > 0) 
                    {
                        var input_value = accessories_divs.item(j).getElementsByTagName("input").item(0).value.trim();
                        var new_arr = new Object();
                        new_arr.pname = pname;
                        new_arr.level = knm + 1;
                        new_arr.opt_id = option_id;
                        new_arr.value1 = input_value;
                        new_arr.value2 = "acs";
                        new_arr.value3 = "";
                        new_arr.value4 = "";
                        new_arr.value5 = "";
            
                        arr.push(new_arr);
                    }
                }
            }
        }
    }


    var new_arr = new Object();
    new_arr.json = arr;
    new_arr.productname = document.getElementById("inp_pname").value.trim();
    new_arr.productid = document.getElementById("inp_pid").value.trim();
    new_arr.customerid = document.getElementById("inp_customerid").value.trim();
    new_arr.customeremail = document.getElementById("inp_customeremail").value.trim();

    var myJsonString = JSON.stringify(new_arr);
    return myJsonString;
}


function control_quote()
{
    if (document.getElementById("inp_cart_id"))
    {
        var cart_id = document.getElementById("inp_cart_id").value;
        
        require(['jquery'], function($)
        {
            
               $(document).ready(function(){
                var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);
                     $.post(link,
             {
               m: "controlquote",
               cid: cart_id
             },
             function(data, status){
                 if (data)
                 {
                     var json = JSON.parse(data);
                     if (json.msg == "not found")
                     {
                         location.reload();
                     }
                 }
               console.log(data);
             });
               });
        });
    
    
    
    }
}



let lastChangeTimes = {};
setInterval(checkemailvalidation, 5000);

function checkemailvalidation()
{
    if (location.toString().indexOf("vlaggenactie.nl/checkout") !== -1)
    {
    	var div_left_sidebar_display = document.getElementById("div_left_sidebar").style.display;
    	if (div_left_sidebar_display !== "block")
    	{
    		var customer_password_element = document.getElementById("customer-password");
    		if (customer_password_element)
    		{
    			customer_password_element = customer_password_element.parentElement.parentElement.parentElement;
    			var customer_password_element_display = customer_password_element.style.display;
    
    
    
    			if (customer_password_element_display == "none")
    			{
    				var shipping_address_modal = document.getElementById("modal-content-20");
    				if (shipping_address_modal)
    				{
    					var rect = shipping_address_modal.getBoundingClientRect();
    					var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    					var snc = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    					if (snc == false)
    					{
    						console.log("kapali aciyorum");
    						new_address2();
    					}
    					else
    					{
    						console.log("zaten acik");
    					}
    				}
    
    				
    				
    			}
    		}
    	}
    	else
    	{
    		console.log("musteri login olmus")
    	}
    }
}





function checkAfterDelay(name) {
  const now = Date.now();
  const threeSeconds = 3000; // Üç saniye

  if (now - lastChangeTimes[name] >= threeSeconds) {
    // Burada gerekli işlemleri yapabilirsiniz
    console.log(`Input '${name}' değeri boş değil ve üç saniye geçti.`);
    check_vat_id2();
  } else {
    // Üç saniye geçmedi, beklemeye devam et
    setTimeout(() => checkAfterDelay(name), threeSeconds - (now - lastChangeTimes[name]));
  }
}

function check_vat_id2()
{
    var vat_element = document.getElementsByName("vat_id");
    vat_element = vat_element.item(0);
    vat = vat_element.value.trim();
    
    
    var country_element = document.getElementsByName("country_id").item(0);
    country_id = country_element.value;
    
    
    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
      var data = this.responseText;
      if (JSON.parse(data))
      {
          var json = JSON.parse(data);
          var stat = json.stat;
          if (stat == "success")
          {
              var company = json.company;
              var street  = json.street;
              var house_number = json.house_number;
              var postcode = json.postcode;
              var city = json.city;
              var country = json.country_id;
              
              var company_element = document.getElementsByName("company").item(document.getElementsByName("company").length - 1);
              company_element.value = company;
              trigger_an_item3("company");
              
              var street_element = document.getElementsByName("street[0]").item(document.getElementsByName("street[0]").length - 1);
              street_element.value = street
              trigger_an_item3("street[0]");
              
              var house_number_element = document.getElementsByName("house_number").item(document.getElementsByName("house_number").length - 1);
              house_number_element.value = house_number;
              trigger_an_item3("house_number");
              
              var city_element = document.getElementsByName("city").item(document.getElementsByName("city").length - 1);
              city_element.value = city;
              trigger_an_item3("city");
              
              var postcode_element = document.getElementsByName("postcode").item(document.getElementsByName("postcode").length - 1);
              postcode_element.value = postcode;
              trigger_an_item3("postcode");
              
              
              var country_element = document.getElementsByName("country_id").item(document.getElementsByName("country_id").length - 1);
              country_element.value = country;
              
              
              setTimeout(controlpostcode,100);
          }
              
      }
      
      
      
    }
    xhttp.open("POST", link);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("m=checkvat&vat=" + vat + "&country_id=" + country_id);
    
}

function setCssTextStyle(el, style, value) {
  var result = el.style.cssText.match(new RegExp("(?:[;\\s]|^)(" +
      style.replace("-", "\\-") + "\\s*:(.*?)(;|$))")),
    idx;
  if (result) {
    idx = result.index + result[0].indexOf(result[1]);
    el.style.cssText = el.style.cssText.substring(0, idx) +
      style + ": " + value + ";" +
      el.style.cssText.substring(idx + result[1].length);
  } else {
    el.style.cssText += " " + style + ": " + value + ";";
  }
}

function check_vat_id()
{
    var vat_element = document.getElementsByName("vat_id");
    vat_element = vat_element.item(0);
    console.log("VAT : ".vat_element);
}

function show_company_or_peronal(knm)
{
    if (knm == 0)
    {
        document.getElementById("html").checked = true;
        var vat_id_elem = document.getElementsByName("shippingAddress.vat_id");
        vat_id_elem = vat_id_elem.item(0);
        vat_id_elem.style.display = "none";
        
        var company_element = document.getElementsByName("shippingAddress.company");
        company_element = company_element.item(0);
        company_element.style.display = "none";
        
    }
    
    if (knm == 1)
    {
        jQuery(document).on('keyup', '[name="vat_id"]', function(event) {
            check_vat_id();   
            
        });
        
        document.getElementById("css").checked = true;
        var vat_id_elem = document.getElementsByName("shippingAddress.vat_id");
        vat_id_elem = vat_id_elem.item(0);
        vat_id_elem.style.display = "block";
        
        var company_element = document.getElementsByName("shippingAddress.company");
        company_element = company_element.item(0);
        company_element.style.display = "block";
        
    }
}

function redesign_address_areas()
{
    console.log("redesign_address_areas");
    var which_modal = -1;
    if (document.getElementById("myModalcustomer_new"))
    {
        if (document.getElementById("myModalcustomer_new").style.display == "block")
        {
            which_modal = 9;
        }
    }
    if (document.getElementById("myModalcustomer_edit_address"))
    {
        if (document.getElementById("myModalcustomer_edit_address").style.display == "block")
        {
            which_modal = 10;
        }
    }
    
    if (document.getElementById("myModalcustomer_sales_edit_address"))
    {
        if (document.getElementById("myModalcustomer_sales_edit_address").style.display == "block")
        {
            which_modal = 11;
        }
    }
    
    if (which_modal == -1)
    {
        
    }
    
    if (which_modal == 9)
    {
        var country_id = document.getElementById("customer_new_countryPhone").value;
        if (country_id == "Netherlands")
        {
            show_other_area(9);
        }
        else
        {
            hide_other_area(9);
        }
    }
    
    if (which_modal == 10)
    {
        var country_id = document.getElementById("customer_edit_countryPhone").value;
        if (country_id == "Netherlands")
        {
            hide_other_area(10);
        }
        else
        {
            show_other_area(10);
        }
    }
    
    if (which_modal == 11)
    {
        var country_id = document.getElementById("sales_edit_countryPhone").value;
        if (country_id == "Netherlands")
        {
            hide_other_area(11);
        }
        else
        {
            
            show_other_area(11);
        }
    }
    
    
}
function hide_1()
{
    document.getElementById("payment").style.display = "none";
	document.getElementById("card_shipping_text").innerHTML = "";
	document.getElementById("card_shipping_price").innerHTML = "";
	document.getElementById("btn-placeOrder").disabled = true;
	document.getElementById("btn-placeOrder").className = "btn btn-default";
}
function show_shipping_step_content()
{
   
}
function set_address_id(address_id)
{
    var itemm = document.getElementsByClassName("tbl_products");
    if (itemm.length > 0)
    {
        var item_id = itemm.item(0).id;
        item_id = item_id.replace("tbl_products_","");
        
        var link2 = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);
        jQuery.ajaxSetup(
              {
                cache: false
              });
              
        jQuery.post(link2, 
        {
            m: "setaddressid",
            itemid: item_id,
            aid: address_id
        },
        function(data, status) 
        {
            var json = JSON.parse(data);
            if (json)
            {
                var postcode =  json.postcode;
                var country = json.country;
                document.getElementById("inp_shipping_postcode").value = postcode;
                document.getElementById("inp_shipping_country").value = country;
            }
        }	
        );
    }
}



 
 function set_peymentmethod_selected(paymentmethod) {
  var payment_method = paymentmethod.method;
  
  var txt = "";

     if (payment_method == "mollie_methods_creditcard") {
      txt = "Credit Cards";
    }
    if (payment_method == "mollie_methods_ideal") {
      txt = "iDeal";
    }
    if (payment_method == "mollie_methods_kbc") {
      txt = "KBC / CBC";
    }
    if (payment_method == "mollie_methods_banktransfer") {
      txt = "Banktransfer";
    }
    if (payment_method == "mollie_methods_paypal") {
      txt = "Paypal";
    }
    if (payment_method == "mollie_methods_sofort") {
      txt = "Sofort";
    }
    if (payment_method == "mollie_methods_belfius") {
      txt = "Belfius";
    }
    if (payment_method == "mollie_methods_bancontact") {
      txt = "Bankcontact";
    }
  
  document.getElementsByClassName("card_content_novalue").item(0).innerHTML = "<a>" + txt + "</a>";
  
  var payment_method_titles = document.getElementsByClassName("payment-method-title");
    for (var j = 0;j < payment_method_titles.length;j++)
    {
        var active_div = payment_method_titles.item(j);
        active_div.className = "payment-method-title field choice";
    }
    if (document.getElementById(payment_method))
    {
        var par_element = document.getElementById(payment_method).parentElement;
        par_element.className = "payment-method-title field choice selected";
  
      
       
      
      
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("payment_method", payment_method);
    
        //setTimeout(get_paymentmethod_selected, 2000);
      }
        // ("a----" + paymeent_method);
    }
  
    
}
 
 function set_payment_price() 
 {
  var shippingday     = document.getElementById("inp_shipping_day").value;
  var shippingcountry = document.getElementById("inp_shipping_country").value;
  
  var shippingdate    = document.getElementById("inp_shipping_date").value;
  var shippingdaycount = document.getElementById("inp_shipping_daycount").value;
  
  var item_id = document.getElementsByClassName("tbl_products").item(0).id;
  item_id = item_id.replace("tbl_products_","");

  var link2 = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

  
  jQuery.ajaxSetup(
              {
                cache: false
              });
              
  jQuery.post(link2, {
      m: "setpaymentp",
      site: "vlaggenactie",
      cid: item_id,
      sday: shippingday,
      scountry: shippingcountry,
      sdate: shippingdate,
      sdaycount: shippingdaycount
    },
    function(data, status) {
      if (data)	
      {	
        var json = JSON.parse(data);	
        var o_extra_price = json.extra;	
        var o_pms = json.pms;	
        var o_shipping_price = json.shipping_price;	
        	
        var o_product_prices = json.product_prices;	
        var o_total_prices_excl_tax = json.total_prices_excl_tax;	
        var o_grand_total = json.grand_total;
        var o_discount    = json.discount;
     
        
           
        document.getElementById("card_extra_fee").innerHTML = "€ " + o_extra_price;	
        document.getElementById("card_shipping_price").innerHTML = "€ " + o_shipping_price;	
        document.getElementById("total_producten").innerHTML =  "€ " + o_product_prices;	
        document.getElementById("total_producten_excl").innerHTML =  "€ " + o_total_prices_excl_tax;	
        document.getElementById("total_producten_incl").innerHTML =  "€ " + o_grand_total;	
        document.getElementById("total_producten_korting").innerHTML =  "€ " + o_discount;
        
        if (o_discount == 0)
        {
            document.getElementById("div_korting").style.display = "none";
        }
        else
        {
            document.getElementById("div_korting").style.display = "block";
        }
     
     
     
     
     
      }	
      
      //document.getElementById("step1").className = "select1";
      
      document.getElementById("btn-placeOrder").disabled = true;
      document.getElementById("btn-placeOrder").className = "btn btn-default";
      document.getElementById("btn-placeOrder").setAttribute("onclick", "control_settings()");

      }
  );
}

 
 function control_payment()
{
    var payment = document.getElementById("payment");
    if (document.getElementById("payment"))
    {
        var form_payment = document.getElementById("co-shipping-method-form");
        var btn = form_payment.getElementsByTagName("button").item(0);
            
        btn.click();    
    }
}


function show_payment() 
{
   setTimeout(set_payment_price, 100);
   if (document.getElementById("payment"))
   {
        //document.getElementById("payment").style.display = "block";
        //document.getElementById("payment").style.position = "relative";
        //document.getElementById("payment").style.left = "0px";
        setTimeout(set_payment_price, 100);
        //document.getElementById("span_doorgaan").innerHTML = "Doorgaan Met Betalen";
        
        document.getElementById("li_options").style.display = "block";
        document.getElementById("li_options").style.position = "relative";
        document.getElementById("li_options").style.left = 0;
        
        document.getElementById("span_doorgaan").innerHTML = "Bestelling Afronden";
   }
}


 
 function set_prices(shipping_price) {
  var extra_price = document.getElementById("card_extra_fee").innerHTML.trim();
  
  if (extra_price == "Geen Toeslag" || extra_price == "Geen toeslag" || extra_price == "Geentoeslag") {
    extra_price = "0";
  }
  extra_price = extra_price.replace("€", "");
  extra_price = extra_price.trim();
  extra_price = parseFloat(extra_price);

  var tbl_products = document.getElementById("tbl_products");
  var tot = 0;
  for (var i = 0; i < tbl_products.getElementsByClassName("td_price").length; i++) {
    var price_td = tbl_products.getElementsByClassName("td_price").item(i);

    price_td = price_td.innerHTML;
    price_td = price_td.replace("€", "");
    price_td = price_td.trim();
    price_td = parseFloat(price_td);
    tot += price_td;
  }
  for (var i = 0; i < tbl_products.getElementsByClassName("td_software_price").length; i++) {
    var price_td = tbl_products.getElementsByClassName("td_software_price").item(i);

    price_td = price_td.innerHTML;
    price_td = price_td.replace("€", "");
    price_td = price_td.trim();
    price_td = parseFloat(price_td);
    tot += price_td;
  }
  for (var i = 0; i < tbl_products.getElementsByClassName("td_hardware_price").length; i++) {
    var price_td = tbl_products.getElementsByClassName("td_hardware_price").item(i);

    price_td = price_td.innerHTML;
    price_td = price_td.replace("€", "");
    price_td = price_td.trim();
    price_td = parseFloat(price_td);
    tot += price_td;
  }

  var total_producten_price = tot + extra_price;
  total_producten_price = total_producten_price.toFixed(2);

  total_producten_price = "€ " + total_producten_price;
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("total_producten", total_producten_price);
  }
  document.getElementById("total_producten").innerHTML = total_producten_price;

  var total_producten_excl = parseFloat(tot) + parseFloat(extra_price) + parseFloat(shipping_price);
  total_producten_excl = total_producten_excl.toFixed(2);
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("total_producten_excl", "€ " + total_producten_excl);
  }
  document.getElementById("total_producten_excl").innerHTML = "€ " + total_producten_excl;

  var total_producten_incl = 1.21 * (tot + extra_price + shipping_price);
  total_producten_incl = total_producten_incl.toFixed(2);
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("total_producten_incl", "€ " + total_producten_incl);
  }
  document.getElementById("total_producten_incl").innerHTML = "€ " + total_producten_incl;


}
  function set_shipping_prices(day)
{
    var shipping_country = document.getElementById("inp_shipping_country").value.trim();
    var shipping_postcode = document.getElementById("inp_shipping_postcode").value.trim();

    if (day.indexOf("saturday") !== -1)
    {
        document.getElementById("inp_shipping_day").value = "Zaterdag";
    }    

    var shipping_day     = document.getElementById("inp_shipping_day").value.trim();
    var shipping_date    = document.getElementById("inp_shipping_date").value.trim();
    var cart = document.getElementById("mini-cart");
    if (cart)
    {
      var delete_item = cart.getElementsByClassName("delete");
      if (delete_item.length > 0)
      {
        delete_item = delete_item.item(0);
        var item_id = delete_item.getAttribute("data-cart-item");
      

        var link2 = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

      var cart_id = document.getElementById("inp_cart_id").value; 
      jQuery.ajaxSetup(
                {
                  cache: false
                });
                
      jQuery.post(link2, {
          m: "setdate",
          site: "vlaggenactie",
          cid: item_id,
          cartid: cart_id,
          day: day,
          shippingcountry: shipping_country,
          shippingpostcode: shipping_postcode,
          shippingday: shipping_day,
          shippingdate: shipping_date
        },
        function(data, status) 
        {
          // (data);
          
          var json = JSON.parse(data);
          shipping_data = json;
          var pickup_label = document.getElementById("label_method_pickup_pickup");
          if (pickup_label)
          {
             var pickup_label_display = jQuery('#label_method_pickup_pickup').css('display');
             if (pickup_label_display == "block")
             {
                if (pickup_label.parentElement.getElementsByTagName("span").length > 0)
                  {
                    var pickup_price = json["pickup"];
                    var price_element = pickup_label.parentElement.getElementsByTagName("span").item(0);
                    price_element.innerHTML = "€" + pickup_price;
                    
                    var pickup_packaging_price =  json["pickup-packaging"];
                    var packaging_element = pickup_label.parentElement.getElementsByTagName("span").item(1);
                    packaging_element.innerHTML = "Excl. €" + pickup_packaging_price + " verpakking";
                    
                  }    
             }
          }
          
          var dhl_label = document.getElementById("label_method_customshipping_customshipping");
          if (dhl_label)
          {
            
            var dhl_label_tr =   dhl_label.parentElement;
            if (day.indexOf("normal") !== -1)
            {
              var ship_price = json["dhl-standard-shipping"];
             
              if (ship_price == "na" || ship_price == "999999" || ship_price == undefined)
              {
                 dhl_label_tr.style.display = "none";
              }
              else
              {
                  dhl_label_tr.style.display = "flex";
                  
                  if (dhl_label.parentElement.getElementsByTagName("span").length > 0)
                  {
                    var price_element = dhl_label.parentElement.getElementsByTagName("span").item(0);
                    price_element.innerHTML = "€" + ship_price;
                    
                    
                    var packaging_price = json["dhl-standard-packaging"];
                    var packaging_element = dhl_label.parentElement.getElementsByTagName("span").item(1);
                    packaging_element.innerHTML = "Excl. €" + packaging_price + " verpakking";
                    
                    
                    
                  }
              }
            } 
            
            if (day.indexOf("saturday") !== -1)
            {
              var ship_price = json["dhl-saturday-shipping"];
             
              if (ship_price == "na" || ship_price == undefined)
              {
                 dhl_label_tr.style.display = "none";
              }
              else
              {
                  dhl_label_tr.style.display = "flex";
                  
                  if (dhl_label.parentElement.getElementsByTagName("span").length > 0)
                  {
                    var price_element = dhl_label.parentElement.getElementsByTagName("span").item(0);
                    price_element.innerHTML = "€" + ship_price;
                    
                    var packaging_price = json["dhl-saturday-packaging"];
                    var packaging_element = dhl_label.parentElement.getElementsByTagName("span").item(1);
                    packaging_element.innerHTML = "Excl. €" + packaging_price + " verpakking";
                    
                  }
              }
            } 
            
           
            
            
            
            
            
          }
          
          var onbezorg_label = document.getElementById("label_method_onbezorg_onbezorg");
          if (onbezorg_label)
          {
            
            
            var onbezorg_label_tr =   onbezorg_label.parentElement;
            if (day.indexOf("normal") !== -1)
            {
              var ship_price = json["homedelivery-standard-shipping"];
             
              if (ship_price == "na" || ship_price == undefined)
              {
                 onbezorg_label_tr.style.display = "none";
              }
              else
              {
                  onbezorg_label_tr.style.display = "flex";
                  if (onbezorg_label.parentElement.getElementsByTagName("span").length > 0)
                  {
                    var price_element = onbezorg_label.parentElement.getElementsByTagName("span").item(0);
                    price_element.innerHTML = "€" + ship_price;
                    
                    
                    var packaging_price = json["homedelivery-standard-packaging"];
                    var packaging_element = onbezorg_label.parentElement.getElementsByTagName("span").item(1);
                    packaging_element.innerHTML = "Excl. €" + packaging_price + " verpakking";
                    
                    
                    
                  }
              }
            } 
            else
            {
              var ship_price = json["homedelivery-saturday-shipping"];
             
              if (ship_price == "na" || ship_price == undefined)
              {
                 onbezorg_label_tr.style.display = "none";
              }
              else
              {
                  onbezorg_label_tr.style.display = "flex";
                  
                  if (onbezorg_label.parentElement.getElementsByTagName("span").length > 0)
                  {
                    var price_element = onbezorg_label.parentElement.getElementsByTagName("span").item(0);
                    price_element.innerHTML = "€" + ship_price;
                    
                    
                 
                    
                    var packaging_price = json["homedelivery-saturday-packaging"];
                    var packaging_element = onbezorg_label.parentElement.getElementsByTagName("span").item(1);
                    packaging_element.innerHTML = "Excl. €" + packaging_price + " verpakking";
                    
                  }
              }
            }
           
           
            
            
            
            
            
          }
          
 
          
          if (document.getElementById("opc-shipping_method"))
          {
            document.getElementById("opc-shipping_method").style.display = "block";
            document.getElementById("opc-shipping_method").style.position = "relative";
            document.getElementById("opc-shipping_method").style.left = "0";
            
            var shipping_method_element = document.getElementById("opc-shipping_method");
            if (shipping_method_element.innerHTML.indexOf("row selected") !== -1)
            {
                var trs = shipping_method_element.getElementsByTagName("tr");
                for (var i = 0;i < trs.length;i++)
                {
                  var active_tr = trs.item(i);
                  var class_name = active_tr.getAttribute("class");
                  if (class_name == "row selected")
                  {
                    active_tr.click();
                  }
                }
            }
            
          }
          
          
          
          
          

        });
      }
      

      }    
}
 

 function set_shipping(title) 
 {
    setTimeout(function()
        {
            var title2 = "";
            var price;
            var card_content_date = document.getElementById("card_date").innerHTML;
            
    
            if (title == 'customshipping')
            {
              title2 = "Transmission - Standaard";
              
              if (card_content_date.indexOf("Zaterdag") == -1)
              {
                price = shipping_data["dhl-standard"];
              }
              else
              {
                price = shipping_data["dhl-saturday"];
              }
            }
            
            if (title == 'pickup')
            {
              title2 = "vlaggenactie Afhaalpunt -De Meern";
              //price = shipping_data["pickup"];
              price = shipping_data["pickup-shipping"] + shipping_data["pickup-packaging"];
            }
            
            if (title == 'onbezorg')
            {
              title2 = "Snellebo - Standaard";
              
              if (card_content_date.indexOf("Zaterdag") == -1)
              {
                price = shipping_data["homedelivery-standard"];;
              }
              else
              {
                price = shipping_data["homedelivery-saturday"];;
              }
            }
    
            var table = document.getElementsByClassName("table-checkout-shipping-method").item(0);
            if (table.getElementsByTagName("tr").length > 1) 
            {
                table.getElementsByTagName("tr").item(1).className = "row";
            }
            
            if (table.getElementsByTagName("tr").length > 2) 
            {
                table.getElementsByTagName("tr").item(2).className = "row";
            }
            
            if (table.getElementsByTagName("tr").length > 3) {
                table.getElementsByTagName("tr").item(3).className = "row";
            }



            var trs = table.getElementsByTagName("tr");
            var tr_index = get_selected_tr_index(title2);
            
            table.getElementsByTagName("tr").item(tr_index).className = "row selected";


            var item_id = document.getElementsByClassName("tbl_products").item(0).id;
  
            var lnk = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

            jQuery.post(lnk,
              {
                m: "setshippingmethod",
                cid: item_id,
                t: title
              },
              function(data, status)
              {
                if (price == "na" || price == undefined)
                {
                    document.getElementById("payment").style.display = "none";
                    document.getElementById("card_shipping_text").innerHTML = "";
                    document.getElementById("card_shipping_price").innerHTML = "";
                    document.getElementById("btn-placeOrder").disabled = true;
                    document.getElementById("btn-placeOrder").className = "btn btn-default";
                    
                }
                else
                {
                    document.getElementById("card_shipping_text").innerHTML = title2;
                    document.getElementById("card_shipping_price").innerHTML = "€" + price;
            
                    set_prices(price);
                    control_payment();
                    unselect_payment_methods();
                    
                    
                }
                
             
             
             
              });
    
            },1000);
    

  
  
  
}

function set_shipping_date(date_text,year)
{
        if (year == 0)
        {
            const d = new Date();
            year = d.getFullYear();
        }
        var item_ids_txt = document.getElementsByClassName("tbl_products").item(0).id;
        item_ids_txt = item_ids_txt.replace("tbl_products_","");
        var lnk = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


        jQuery.ajaxSetup({
            cache: false
        });


        jQuery.post(lnk, {
                    m: "setshippingdate",
                    site: "vlaggenactie",
                    cids: item_ids_txt,
                    d: date_text,
                    y: year
                },
                function(data, status) {
                });
}
 
 function select_date(dateText) {
  var bol = dateText.split("-");
  var m = bol[0];
  var g = bol[1];
  var y = bol[2];



  dateText = y + "-" + m + "-" + g;
  // (dateText);

 
 
  document.getElementById("div_date_picker").style.height = "0px";
  var d = new Date(dateText);
  // (d);
  // (d.getDay());
  var days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  var dayName = days[d.getDay()];

  var months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
  var monthName = months[d.getMonth()];

  var dayNumber = dateText.split("-")[1];
  var out_date = dayName + " " + g + " " + monthName;
  document.getElementById("span_custom_date").innerHTML = out_date;

  //jQuery('#li_day_selection .card2').toggleClass('card2');

  for (var i = 0; i < 20; i++) {
    if (document.getElementById("card2_" + i)) {
      document.getElementById("card2_" + i).className = "card2";
    }
  }

  document.getElementById("card2_custom").className = "card2 selected";
  document.getElementById("div_date_picker").style.height = "0px";
  // (out_date);

  var cart = document.getElementById("mini-cart");
  if (cart) {
    var delete_item = cart.getElementsByClassName("delete");
    delete_item = delete_item.item(0);
    var item_id = delete_item.getAttribute("data-cart-item");




    var extra_price = "Geentoeslag";
    var shipping_day = out_date.split(" ")[0];
    shipping_day = shipping_day.trim();
    
    document.getElementById("inp_shipping_day").value = shipping_day;
    document.getElementById("inp_shipping_date").value = out_date;
    set_shipping_date(out_date,y);
    
    
    
    
    document.getElementById("card_date").innerHTML = out_date;
    document.getElementById("card_extra_fee").innerHTML = extra_price;
    var day = document.getElementById("max_day").value;
    
    if (dayName == "Zaterdag")
    {
      day = day + "_saturday";
    }
    else
    {
      day = day + "_normal";
    }
    
    set_shipping_prices(day);
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("card_day", day);
      localStorage.setItem("card_date", out_date);
      localStorage.setItem("card_extra_fee", extra_price);
    }

    //rev1
    //set_opt();

    //control_payment();
    show_shipping();
        

  }

}

function show_shipping()
{
    setTimeout(function()
    {
        var dis = document.getElementById("opc-shipping_method").style.position;
        if (dis == "absolute")
        {
            document.getElementById("opc-shipping_method").style.position = "relative";
            document.getElementById("opc-shipping_method").style.left = 0;
        }
    },300);
}
   
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function get_price_data() {
    var link = window.location.origin;

    var html = `<div class="step_error"></div>
                <div class="step-block-header panel_header panel_header_delivery">
        <div class="panel_icon">
            <img src="` + link + `/pub/media/icon/afhaal_of_bezorgdatum.svg" style="height: 35px; margin-top: 6px;">
        </div>
        <div class="panel_main">
            <h4 class="panel_main_title has-success">
                <span class="delivery link--gray">Afhaal- of bezorgdatum</span>
            </h4>
            <span class="panel_main_subtitle">Kies de dag van bezorgen of afhalen.</span>
        </div>
    </div>`;
    if (document.getElementById("other_prices"))
    {
        document.getElementById("other_prices").innerHTML = "";
    }
    


    var li_count = document.getElementsByClassName("tbl_products").length;
    if (li_count > 0) {
        var item_ids = [];
        var item_ids_txt = document.getElementsByClassName("tbl_products").item(0).id;
        item_ids_txt = item_ids_txt.replace("tbl_products_","");
        var lnk = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


        jQuery.ajaxSetup({
            cache: false
        });

        jQuery.post(lnk, {
                    m: "calculatecart2",
                    site: "vlaggenactie",
                    cids: item_ids_txt
                },
                function(data, status) {
                    if (data && IsJsonString(data) == true) {
                        //slidee();



                        //// ("gonderilen item id ----"  + item_id);
                        //// ("gelen data-----" + data);

                        var json = JSON.parse(data);
                        price_data = json;
                        //// (json);
                        json = json["diff"];
                        var startdate = price_data["startdate"];
                        if (json.length > 0) {
                            for (var i = 0; i < json.length; i++) {
                                var active_item = json[i];
                                var day_str = active_item["daystr"];
                                var tot = active_item["tot"];
                                var day = active_item["day"];
                                var day_type = active_item["day_type"];
                                var id_day = "";
                                if (day_type == "normal") {
                                    id_day = "card2_" + day + "_normal";
                                } else {
                                    id_day = "card2_" + day + "_" + day_type;
                                }

                                document.getElementById("max_day").value = day;
                                if (tot == 0) 
                                {
                                    if (day == 0)
                                    {
                                        html += `<div  onclick="go_to_shipping_method(this,` + day + `,'` + day_type + `')"  id="` + id_day + `"  class='card2 card3'>
                                    

                                               <div style="float:left">
                                                    <div class="div_attention_left"><span>` + day_str + `</span></div>
                                                    <div class="div_attention"><span>Speciaal transport (hoge kosten)</span></div>
                                               
                                               </div>
                                                <div style="float:right"> 
                                                    <span style="float:left;color:rgb(255,128,35)">Geen toeslag</span>
            
                                                    <span class="checkmark checkmarkStyle2" style="margin-top:-24px">
                                                       
                                                    </span>
                                                </div>

                                            </div>`;
                                    }   
                                    else
                                    {
                                        html += `<div  onclick="go_to_shipping_method(this,` + day + `,'` + day_type + `')" id="` + id_day + `"  class='card2 card3'>
                                                    <span style="float:left">` + day_str + `</span>
                                                    <div style="float:right"> 
                                                        <span style="float:left;color:rgb(255,128,35)">Geen toeslag</span>
                
                                                        <span class="checkmark checkmarkStyle2" style="margin-top:-24px">
                                                            
                                                        </span>
                                                    </div>
                                                     </div>`;
                                    }
                                    
                                } 
                                else 
                                {
                                    if (day == 0)
                                    {
                                        html += `<div  onclick="go_to_shipping_method(this,` + day + `,'` + day_type + `')"  id="` + id_day + `"  class='card2 card3'>
                                    

                                               <div style="float:left">
                                                    <div class="div_attention_left"><span>` + day_str + `</span></div>
                                                    <div class="div_attention"><span>Speciaal transport (hoge kosten)</span></div>
                                               
                                               </div>
                                                <div style="float:right"> 
                                                    <span style="float:left;color:rgb(255,128,35)">+ € ` + tot + `</span>
            
                                                    <span class="checkmark checkmarkStyle2" style="margin-top:-24px">
                                                       
                                                    </span>
                                                </div>

                                            </div>`;
                                    }
                                    else
                                    {
                                        html += `<div  onclick="go_to_shipping_method(this,` + day + `,'` + day_type + `')"  id="` + id_day + `"  class='card2 card3'>
                                    

                                                <span style="float:left">` + day_str + `</span>
                                                <div style="float:right"> 
                                                    <span style="float:left;color:rgb(255,128,35)">+ € ` + tot + `</span>
            
                                                    <span class="checkmark checkmarkStyle2" style="margin-top:-24px">
                                                       
                                                    </span>
                                                </div>

                                            </div>`;
                                    }
                                    
                                }



                            }

                        } else {
                            //setTimeout(fill_table,500);

                        }
                        html += `<div onclick="show_date_picker()" id="card2_custom" class="card2 card3">
                                    <span style="float:left" id="span_custom_date">Kies een andere datum </span>
                                    
                                    <div style="float:right"> 
                                        <span style="float:left;color:#ff6600">Geen Toeslag</span>

                                        <span class="checkmark checkmarkStyle2" style="margin-top:-24px">
                                            
                                        </span>
                                    </div>
                            </div>`;




                        html += `<div id="div_date_picker"><input type="input" id="hiddenField" class="datepicker" style="display:none"  /></div>`;

                        var dff = price_data.diff;
                        var last_day = price_data.startdate;
                            
                        if (document.getElementById("other_prices"))
                        {
                            document.getElementById("other_prices").innerHTML = html;
                        }
                        
                        

                        var holidays = document.getElementById("inp_holidays").value.trim();
                        var holidays_arr = holidays.split(",");

                        require(["jquery", "mage/calendar"], function($) {
                            jQuery.datepicker.regional['nl'] = {
                                closeText: 'Sluiten', // set a close button text
                                currentText: 'Vandaag', // set today text
                                monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'], // set month names
                                monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'], // set short month names
                                dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'], // set days names
                                dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'], // set short day names
                                dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'], // set more short days names
                                dateFormat: 'mm-dd-yy', // set format date
                                "setDate": new Date(),
                                "autoclose": true,
                                //beforeShowDay: jQuery.datepicker.noWeekends,
                                //beforeShowDay: noWeekendsOrHolidays,
                                beforeShowDay: function(date) {
                                    // (date.getTime() + "-------" + last_day);
                                    if (date.getTime() <= last_day) {
                                        return [false];
                                    } else {
                                        var day = date.getDate();
                                        var month = date.getMonth();
                                        month = month + 1;
                                        var yy = date.getYear() + 1900;

                                        var dd_text = day + "/" + month + "/" + yy;
                                        if (holidays_arr.includes(dd_text)) {
                                            return [false];
                                        } else {
                                            var day_name = date.getDay();

                                            // (day_name);
                                            if (day_name == 0) {
                                                return [false];
                                            } else {
                                                return [true];
                                            }
                                        }


                                    }

                                },
                                'setStartDate': "2022-16-03",

                                onSelect: function(dateText) {
                                    select_date(dateText);

                                }
                            };

                            jQuery.datepicker.setDefaults($.datepicker.regional['nl']);
                            jQuery("#hiddenField").datepicker({
                                showOn: "button",
                                buttonText: "day",
                                firstDay: 1
                            });
                            jQuery(document).unbind('mousedown', jQuery.datepicker._checkExternalClick);
                        });
                        
                        set_producttotal_prices();
                    }
                }); 
            }    
}
function func_design_shipping_area()
{
    setTimeout(function()
    {
        
        if (document.getElementById("opc-shipping_method"))
        {
            document.getElementById("opc-shipping_method").style.position = "absolute";
            document.getElementById("opc-shipping_method").style.left = "-50000px";
        }
        else
        {
            setTimeout(func_design_shipping_area,1000);
        }
        
            
        var customer_id = document.getElementById("inp_customerid").value;
        if (customer_id == "")
        {
            document.getElementById("other_prices").style.position = "absolute";
            document.getElementById("other_prices").style.left = "-50000px";
            
            var html = "";
            document.getElementById("div_addresses").innerHTML = "";
        }
        else
        {
            setTimeout(get_price_data,1000);
           
           
            var default_shipping_address = document.getElementById("inp_default_shipping_address").value;
            if (default_shipping_address.length > 0)
            {
                default_shipping_address = default_shipping_address.replace(/'/g, '"');
                var addres_json = JSON.parse(default_shipping_address);
                
                var city            = addres_json["city"];
                var company         = addres_json["company"];
                var country_id      = addres_json["country_id"];
                var firstname       = addres_json["firstname"];
                var lastname        = addres_json["lastname"];
                var postcode        = addres_json["postcode"];
                var street          = addres_json["street"];
                var telephone       = addres_json["telephone"];
                var house_number    = addres_json["house_number"];
                var toevoeging      = addres_json["toevoeging"];
                
                var customer_name   = firstname + " " + lastname;
                var street_str      = street + " " + house_number + " " + toevoeging;
                street_str = street_str.trim();
                
                var address_str = customer_name + " ," +  company + " ," +  street_str + " ," + city + " ," + postcode + " ," +  country_id + " ," + telephone;
                
                var addres_count = document.getElementsByClassName("shipping-address-item").length;
            }
            
            if (default_shipping_address.length == 0)
            {
                var html = `<ul id="step10">
                                <li id="step10_li1" onclick="set_standard_bezorg_address()" style="display: none;">
                                    <div class="ontvanger_div">
                                        <a class="step10_a">Standaard bezorgadres</a>
                                        <br>
                                        <a style="display:block;margin-top: 3px" id="standaard_bezorg_address_a">` + address_str + `</a>
                                    </div>
                                    <div><span class="checkmark checkmarkStyle1"></span></div>
                                </li>
                                <li id="step10_li2" onclick="new_address2()">
                    
                                    <div class="ontvanger_div">
                                        <a class="step10_a">Nieuew adres invoeren</a>
                                        <br>
                                        <a style="display:block;" id="div_shipping_address_1"></a>
                    
                                    </div>
                                    <div><span class="checkmark checkmarkStyle1"></span></div>
                                </li>
                                <li id="step10_li3" onclick="show_address_book()" style="display: none;">
                                    <div class="ontvanger_div">
                                        <a class="step10_a">Kies uit het adresboek</a>
                                        <br>
                                        <a style="display:block;font-size: 10px" id="div_shipping_address_2"></a>
                                    </div>
                                    
                                    <div><span class="checkmark checkmarkStyle1"></span></div>
                                </li>
                            </ul>`;
                            
                
                if (document.getElementById("div_addresses"))
                {
                    document.getElementById("div_addresses").innerHTML = html;
                }
                
            }
            else
            {
                
                var html = `<ul id="step10">
                                <li id="step10_li1" onclick="set_standard_bezorg_address()" style="display: block;">
                                    <div class="ontvanger_div">
                                        <a class="step10_a">Standaard bezorgadres</a>
                                        <br>
                                        <a style="display:block;margin-top: 3px" id="standaard_bezorg_address_a">` + address_str + `</a>
                                    </div>
                                    <div><span class="checkmark checkmarkStyle1"></span></div>
                                </li>
                                <li id="step10_li2" onclick="new_address2()">
                    
                                    <div class="ontvanger_div">
                                        <a class="step10_a">Nieuew adres invoeren</a>
                                        <br>
                                        <a style="display:block;" id="div_shipping_address_1"></a>
                    
                                    </div>
                                    <div><span class="checkmark checkmarkStyle1"></span></div>
                                </li>
                                <li id="step10_li3" onclick="show_address_book()" style="display: block;">
                                    <div class="ontvanger_div">
                                        <a class="step10_a">Kies uit het adresboek</a>
                                        <br>
                                        <a style="display:block;font-size: 10px" id="div_shipping_address_2"></a>
                                    </div>
                                    
                                    <div><span class="checkmark checkmarkStyle1"></span></div>
                                </li>
                            </ul>`;
                            
                
                if (document.getElementById("div_addresses"))
                {
                    document.getElementById("div_addresses").innerHTML = html;
                }
                
                setTimeout(set_standard_bezorg_address,1000);
            }
            
        }
        
        
    },1000);
}


function new_address2()
{
    document.getElementsByClassName("action-show-popup").item(0).click();
    setTimeout(function()
    {
       control_country();
       setTimeout(show_company_or_peronal(0),100);
       setTimeout(controlpostcode,250);
       
       const inputElements = document.querySelectorAll('input[name="vat_id"]');
        inputElements.forEach((input) => {
          input.addEventListener("input", function () {
              
              
            if (input.value.trim() !== "" && input.value.length > 5) {
              lastChangeTimes["vat_id"] = Date.now();
              checkAfterDelay("vat_id");
            }
            
            
          });
        });
        
    },500);
    
    setTimeout(checkJSLoaded,1000);
}






function show_address_bar()
{
    new_address2();
}



function show_other_addres_items(num) 
{
    if (num == 0)
    {
      var street_element = document.getElementById("shipping-new-address-form");
      street_element = street_element.getElementsByClassName("street").item(0);
      street_element.style.display = "block";
      
      var street_element_1 = document.getElementsByName("shippingAddress.street.0").item(0);
      street_element_1.style.display = "block";
      
      var city_element = document.getElementsByName("shippingAddress.city").item(0);
      city_element.style.display = "block";
      
      city_element.style.width = "calc(50% - 10px)";
      city_element.style.float = "left";

      document.getElementById("checkout_extra_fields").style.display = "none";
      
      var house_number_el = document.getElementsByName("shippingAddress.house_number").item(0);
      house_number_el.style.width = "calc(50% - 10px)";
      house_number_el.style.float = "left";
      
      var toevoeging_el = document.getElementsByName("shippingAddress.toevoeging").item(0);
      toevoeging_el.style.width = "calc(50% - 10px)";
      toevoeging_el.style.float = "right";
      
      var postcode_el = document.getElementsByName("shippingAddress.postcode").item(0);
      postcode_el.style.width = "calc(50% - 10px)";
      postcode_el.style.float = "left";
    }
    
    if (num == 10)
    {
        var country_id = document.getElementById("customer_edit_countryPhone").value;
        if (country_id == "Netherlands")
        {
            //hide_other_area(num);
            show_other_area(num); 
        }
        else
        {
               
        }
    }
    if (num == 11)
    {
        var country_id = document.getElementById("sales_edit_countryPhone").value;
        if (country_id == "Netherlands")
        {
            //hide_other_area(num);
            show_other_area(num); 
        }
        else
        {
               
        }
    }
}


function show_other_area(num)
{
     if (num == 9)
    {
        document.getElementById("customer_new_div_item_city").style.padding = "0 5px 0 0";
        document.getElementById("customer_new_div_item_street").style.display = "block";   
        document.getElementById("customer_new_div_item_city").style.display = "block";  
        document.getElementById("customer_new_a_address").style.display = "none";
        document.getElementById("customer_new_div_handmatig").style.display = "none";

        document.getElementById("customer_new_div_item_postalcode").className = "form-outline mb-6 col-md-6";
        document.getElementById("customer_new_div_item_housenumber").className = "form-outline mb-6 col-md-6";
        document.getElementById("customer_new_div_item_toevoeging").className = "form-outline mb-6 col-md-6";
        document.getElementById("customer_new_div_item_city").className = "form-outline mb-12 col-md-12";
    }
    if (num == 10)
    {
        document.getElementById("customer_edit_div_item_city").style.padding = "0 5px 0 0";
        document.getElementById("customer_edit_div_item_street").style.display = "block";   
        document.getElementById("customer_edit_div_item_city").style.display = "block";  
        document.getElementById("customer_edit_a_address").style.display = "none";
        document.getElementById("customer_edit_div_handmatig").style.display = "none";

        document.getElementById("customer_edit_div_item_postalcode").className = "form-outline mb-6 col-md-6";
        document.getElementById("customer_edit_div_item_housenumber").className = "form-outline mb-6 col-md-6";
        document.getElementById("customer_edit_div_item_toevoeging").className = "form-outline mb-6 col-md-6";
        document.getElementById("customer_edit_div_item_city").className = "form-outline mb-12 col-md-12";
    }
    if (num == 11)
    {
        document.getElementById("sales_edit_div_item_city").style.padding = "0 5px 0 0";
        document.getElementById("sales_edit_div_item_street").style.display = "block";   
        document.getElementById("sales_edit_div_item_city").style.display = "block";  
        document.getElementById("sales_edit_a_address").style.display = "none";
        document.getElementById("sales_edit_div_handmatig").style.display = "none";

        document.getElementById("sales_edit_div_item_postalcode").className = "form-outline mb-6 col-md-6";
        document.getElementById("sales_edit_div_item_housenumber").className = "form-outline mb-6 col-md-6";
        document.getElementById("sales_edit_div_item_toevoeging").className = "form-outline mb-6 col-md-6";
        document.getElementById("sales_edit_div_item_city").className = "form-outline mb-12 col-md-12";
    }
}

function hide_other_area(num)
{
    if (num == 9)
    {
        document.getElementById("customer_new_div_item_city").style.padding = "0 5px 0 0";
        document.getElementById("customer_new_div_item_street").style.display = "none";   
        document.getElementById("customer_new_div_item_city").style.display = "none";  
        document.getElementById("customer_new_a_address").style.display = "block";
        document.getElementById("customer_new_div_handmatig").style.display = "block";

        document.getElementById("customer_new_div_item_postalcode").className = "form-outline mb-4 col-md-4";
        document.getElementById("customer_new_div_item_housenumber").className = "form-outline mb-4 col-md-4";
        document.getElementById("customer_new_div_item_toevoeging").className = "form-outline mb-4 col-md-4";

    }
    if (num == 10)
    {
        document.getElementById("customer_edit_div_item_city").style.padding = "padding: 0 5px 0 0";
        document.getElementById("customer_edit_div_item_street").style.display = "none";   
        document.getElementById("customer_edit_div_item_city").style.display = "none";  
        document.getElementById("customer_edit_a_address").style.display = "block";
        document.getElementById("customer_edit_div_handmatig").style.display = "block";

        document.getElementById("customer_edit_div_item_postalcode").className = "form-outline mb-4 col-md-4";
        document.getElementById("customer_edit_div_item_housenumber").className = "form-outline mb-4 col-md-4";
        document.getElementById("customer_edit_div_item_toevoeging").className = "form-outline mb-4 col-md-4";
      
    }
    if (num == 11)
    {
        document.getElementById("sales_edit_div_item_city").style.padding = "0 5px 0 0";
        document.getElementById("sales_edit_div_item_street").style.display = "none";   
        document.getElementById("sales_edit_div_item_city").style.display = "none";  
        document.getElementById("sales_edit_a_address").style.display = "block";
        document.getElementById("sales_edit_div_handmatig").style.display = "block";

        document.getElementById("sales_edit_div_item_postalcode").className = "form-outline mb-4 col-md-4";
        document.getElementById("sales_edit_div_item_housenumber").className = "form-outline mb-4 col-md-4";
        document.getElementById("sales_edit_div_item_toevoeging").className = "form-outline mb-4 col-md-4";
       
    }
}


function delete_item(item_id) 
{
  var cart_element = document.getElementById("mini-cart");
  if (cart_element) {
    var selected_i = -1;
    var li_elements = cart_element.getElementsByTagName("li");
    for (var i = 0; i < li_elements.length; i++) {
      var selected_li = li_elements.item(i);
      var selected_li_html = selected_li.innerHTML;

      var src_txt = 'data-cart-item="' + item_id + '"';
      if (selected_li_html.indexOf(src_txt) !== -1) {
        selected_i = i;



      }
    }
    if (selected_i >= 0) {
      var del_element = cart_element.getElementsByTagName("li").item(selected_i).getElementsByClassName("delete").item(0);
      del_element.click();
    } else {
        if (document.getElementById("tbl_products_" + item_id))
        {
            jQuery("#tbl_products_" + item_id).remove();
        }
        if (document.getElementById("tr_btn_" + item_id))
        {
            jQuery("#tr_btn_" + item_id).remove();
        }
        if (document.getElementById("responsive_table_" + item_id))
        {
            jQuery("#responsive_table_" + item_id).remove();
        }
      
      
    }
  }
}

function responsive_delete_item(item_id) 
{
  delete_item(item_id);
}

function plus(id) 
{
  var qty_element = document.getElementById("qty_" + id);
  var qty = parseInt(qty_element.value.trim());

  qty = qty + 1;
  qty_element.value = qty;

  searchQty3(id);


}

function minus(id) 
{
  var qty_element = document.getElementById("qty_" + id);
  var qty = parseInt(qty_element.value.trim());

  if (qty > 1) {
    qty = qty - 1;
    qty_element.value = qty;
    searchQty3(id);
  }

}

function responsive_plus(id) 
{
  var qty_element = document.getElementById("qty_" + id);
  var qty = parseInt(qty_element.value.trim());

  qty = qty + 1;
  qty_element.value = qty;

  searchQty3(id);


}

function responsive_minus(id) 
{
  var qty_element = document.getElementById("qty_" + id);
  var qty = parseInt(qty_element.value.trim());

  if (qty > 1) {
    qty = qty - 1;
    qty_element.value = qty;
    searchQty3(id);
  }

}

 function searchQty2(input_id) 
{
  var qty = document.getElementById("qty_" + input_id).value.trim();
 
  if (qty == "") {
    qty = 1;
  }
  //clearTimeout(timeout);
setTimeout(function() {
    
      return new Promise((resolve, reject) => {

    document.getElementById("qty_" + input_id).disabled = true;
    document.getElementsByClassName("loading-mask-shopby").item(0).style.display = "block";
   
    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
     
              var data = this.responseText;
                
                var json = JSON.parse(data);
              var dat = json.dat;
              for (var j = 0;j < dat.length;j++)
              {
                  var item_id = dat[j]["item_id"];
                  var price   = parseFloat(dat[j]["price"]);
                  var qty     = dat[j]["qty"];
                  
                 // var tot = price * parseInt(qty);
                  var tot = price ;
                  tot = tot.toFixed(2);
                  
                  if (document.getElementById("responsive_td_price_" + item_id))
                  {
                      document.getElementById("responsive_td_price_" + item_id).innerHTML = "€ " + tot;
                  }
                  
                  
                  if (document.getElementById("td_price_" + item_id))
                  {
                      document.getElementById("td_price_" + item_id).innerHTML = "€ " + tot;
                  }
                  
                  if (document.getElementById("qty_" + item_id))
                  {
                      document.getElementById("qty_" + item_id).value = qty;
                  }
                  
                  if ( document.getElementById("responsive_qty_" + item_id))
                  {
                      document.getElementById("responsive_qty_" + item_id).value = qty;
                  }
                  
                  
              }
      
            
      
           document.getElementById("qty_" + input_id).disabled = false;
           var discount = json.discount;
           document.getElementById("inp_discount").value = discount;
           
           get_price_data();
           var loading_image = document.getElementsByClassName("loading-mask-shopby");
           if (loading_image)
           {
               if (loading_image.length > 0)
               {
                   loading_image.item(0).style.display = "none";
               }
           }
      

       
       
       
       
      

    }
    xhttp.open("POST", link);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("m=updatecartdata&id=" + input_id + "&qty=" + qty);

      });


  }, 2000);
}

function searchQty3(input_id) 
{
  //rev1
 
  
  
  document.getElementsByClassName("loading-mask-shopby").item(0).style.display = "block";

  var qty = document.getElementById("qty_" + input_id).value.trim();
  if (qty == "") {
    qty = 1;
  }
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    
    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      var data = this.responseText;
     
     
  
      
      var json = JSON.parse(data);
      var dat = json.dat;
      for (var j = 0;j < dat.length;j++)
      {
          var item_id = dat[j]["item_id"];
          var price   = parseFloat(dat[j]["price"]);
          var qty     = dat[j]["qty"];
          
         // var tot = price * parseInt(qty);
          var tot = price ;
          tot = tot.toFixed(2);
          
          if (document.getElementById("responsive_td_price_" + item_id))
          {
              document.getElementById("responsive_td_price_" + item_id).innerHTML = "€ " + tot;
          }
          
          
          if (document.getElementById("td_price_" + item_id))
          {
              document.getElementById("td_price_" + item_id).innerHTML = "€ " + tot;
          }
          
          if (document.getElementById("qty_" + item_id))
          {
              document.getElementById("qty_" + item_id).value = qty;
          }
          
          if ( document.getElementById("responsive_qty_" + item_id))
          {
              document.getElementById("responsive_qty_" + item_id).value = qty;
          }
          
          
      }
      document.getElementsByClassName("loading-mask-shopby").item(0).style.display = "none";
      
      var discount = json.discount;
      document.getElementById("inp_discount").value = discount;
      
      
        get_price_data();

    }
    xhttp.open("POST", link);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("m=updatecartdata&id=" + input_id + "&qty=" + qty);




  }, 500);
}

function set_producttotal_prices()
{
  
  var tbl_products = document.getElementById("tbl_products");
  if (tbl_products)
  {
            var tot = 0;
          for (var i = 0; i < tbl_products.getElementsByClassName("td_price").length; i++) {
            var price_td = tbl_products.getElementsByClassName("td_price").item(i);
        
            price_td = price_td.innerHTML;
            price_td = price_td.replace("€", "");
            price_td = price_td.trim();
            price_td = parseFloat(price_td);
            tot += price_td;
        
        
        
          }
          for (var i = 0; i < tbl_products.getElementsByClassName("td_software_price").length; i++) {
            var price_td = tbl_products.getElementsByClassName("td_software_price").item(i);
        
            price_td = price_td.innerHTML;
            price_td = price_td.replace("€", "");
            price_td = price_td.trim();
            price_td = parseFloat(price_td);
            tot += price_td;
          }
        
          for (var i = 0; i < tbl_products.getElementsByClassName("td_hardware_price").length; i++) {
            var price_td = tbl_products.getElementsByClassName("td_hardware_price").item(i);
        
            price_td = price_td.innerHTML;
            price_td = price_td.replace("€", "");
            price_td = price_td.trim();
            price_td = parseFloat(price_td);
            tot += price_td;
          }
        
        
          var total_producten_price = tot;
          
          var extra_price = 0;
          var shipping_price = 0;
          
          if (document.getElementById("card_extra_fee"))
          {
            extra_price = document.getElementById("card_extra_fee").innerHTML;
            if (extra_price == "Geentoeslag")
            {
                extra_price = "0.00";
            }
            extra_price = extra_price.replace("€","");
            extra_price = extra_price.trim();
            
            if (extra_price.length == 0)
            {
              extra_price = "0.00";
            }
            extra_price = parseFloat(extra_price.trim());
            
            shipping_price = document.getElementById("card_shipping_price").innerHTML;
            if (shipping_price == "Geentoeslag")
            {
                shipping_price = "0.00";
            }
            shipping_price = shipping_price.replace("€","");
            shipping_price = shipping_price.trim();
            if (shipping_price.length == 0)
            {
              shipping_price = "0.00";
            }
            
            shipping_price = parseFloat(shipping_price.trim());
          }
          
          total_producten_price = total_producten_price + extra_price;
          
          total_producten_price = total_producten_price.toFixed(2);
        
          total_producten_price = "€ " + total_producten_price;
        
          document.getElementById("total_producten").innerHTML = total_producten_price;
          var discount = document.getElementById("inp_discount").value;
          
          document.getElementById("total_producten_korting").innerHTML = "€ " + discount;
          if (discount > 0)
          {
              document.getElementById("div_korting").style.display = "block";
          }
          else
          {
               document.getElementById("div_korting").style.display = "none";
          }
          
          
          
          //discount oncesi     
          //var total_producten_excl = tot + extra_price + shipping_price;
          
          var total_producten_excl = tot + extra_price + shipping_price - parseFloat(discount);
          total_producten_excl = total_producten_excl.toFixed(2);
          document.getElementById("total_producten_excl").innerHTML = "€ " + total_producten_excl;
        
          
          
          var billing_country_id = document.getElementById("inp_billing_country").value;
          var total_producten_incl = 0;
          if (billing_country_id == "NL" || billing_country_id == "")
          {
            //discount öncesi
            //total_producten_incl = 1.21 * (tot + extra_price + shipping_price);
            total_producten_incl = 1.21 * (tot + extra_price + shipping_price - parseFloat(discount));
            
            
            total_producten_incl = total_producten_incl.toFixed(2);
          }
          else
          {
            //discount öncesi  
            //total_producten_incl = (tot + extra_price + shipping_price);
            total_producten_incl = (tot + extra_price + shipping_price  -  - parseFloat(discount));
            
            total_producten_incl = total_producten_incl.toFixed(2);
          }
        
          document.getElementById("total_producten_incl").innerHTML = "€ " + total_producten_incl;
  }
}

function show_menu(obj,category_id)
{
    var width = parseInt(window.innerWidth);
    if (width >= 600)
    {
    var owl_items = document.getElementsByClassName("owl-item");   
    for (var i = 0;i < owl_items.length;i++)
    {
        var active_div = owl_items.item(i).getElementsByTagName("div").item(0);
        
        //menu_495
        var active_div_id = active_div.getAttribute("id");
        
        if (active_div.getElementsByClassName("cI-1").length > 0)
        {
            if (active_div_id !== "menu_495")
            {
                 active_div.style.backgroundColor = "#fff";
                active_div.style.borderRadius = "6px";
                active_div.getElementsByClassName("cI-1").item(0).style.display = "block";
                active_div.getElementsByClassName("cI-2").item(0).style.display = "none";
                active_div.getElementsByClassName("cat-link").item(0).style.color = "#004161";
            }
           
        }
        
    }
    
       var active_cat = category_id;
   
   if (document.getElementById("menu_" + active_cat).getElementsByClassName("cI-1"))
   {
       if (category_id !== "495")
       {
           document.getElementById("menu_" + active_cat).style.backgroundColor = "#f60";
            document.getElementById("menu_" + active_cat).style.borderRadius = "6px";
            document.getElementById("menu_" + active_cat).getElementsByClassName("cI-1").item(0).style.display = "none";
            document.getElementById("menu_" + active_cat).getElementsByClassName("cI-2").item(0).style.display = "block";
            document.getElementById("menu_" + active_cat).getElementsByClassName("cat-link").item(0).style.color = "#fff";
       }
        
   }
    
    
            var domain = location.origin + "/";
    
            var ht = "";
            document.getElementById("inp_knm_json").value = category_id;
            
            
            
            
            
            if (category_id == 402)
            {
                ht1 = `<li>
      <a style="font-weight:bold" href="https://vlaggenactie.nl/vlaggen.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/m/a/mastvlaggen_1_1.jpg" 		onmouseover="show_product_detail(this)">Vlaggen</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/vlag-eigen-formaat.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/v/l/vlag_eigenformaat__3.jpg" onmouseover="show_product_detail(this)">Vlag (Eigen Formaat)</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/mastvlag.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/m/a/mastvlaggen_1_1.jpg" 
      	onmouseover="show_product_detail(this)">Mastvlag</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/baniervlag.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/b/a/baniervlag_1_1.jpg" 
      	onmouseover="show_product_detail(this)">Baniervlag</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/gevelvlaggen.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/g/e/gevelvlaggen_1_1.jpg"
       	onmouseover="show_product_detail(this)">Gevelvlag</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/beachflags.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/b/e/beachflag_3.jpg" 
      	onmouseover="show_product_detail(this)">Beachflags</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/raamvlag.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/r/a/raamvlag_02_1_.jpg" 
      	onmouseover="show_product_detail(this)">Raamvlag</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/golfvlag.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/g/o/golfvlag_15.jpg" 
      	onmouseover="show_product_detail(this)">Golfvlag</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/kioskvlag.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/k/i/kioskvlaggen_1.jpg"
       	onmouseover="show_product_detail(this)">Kioskvlag</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/vlaggenlijn.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/v/l/vlaggenlijn_2.jpg"
      	 onmouseover="show_product_detail(this)">Vlaggenlijn</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/bootvlag.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/b/o/bootvlag_dsds1.jpg" 
      	onmouseover="show_product_detail(this)">Bootvlag</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/tafelvlag-rechtformaat.html" data-img="https://vlaggenactie.nl/pub/static/frontend/Sm/market/en_US/Magento_Catalog/images/product/placeholder/image.jpg" onmouseover="show_product_detail(this)">Tafelvlag</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/mini-beachflag.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/m/i/minibeachvlag_0123.jpg" onmouseover="show_product_detail(this)">Mini Beachflag</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/baniermast.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/b/a/baniermast.jpg" onmouseover="show_product_detail(this)">Baniermast</a>
    </li>
    
    <li>
      <a href="https://vlaggenactie.nl/vlaggenmast.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/v/l/vlaggenmast.jpg" onmouseover="show_product_detail(this)">Vlaggenmast</a>
    </li>`;
    
    
    
                
                ht2 = ``;
                
                ht3 = ``;
                
                ht4 = ``;
                
                ht5 = `<li>
      <a style="font-weight:bold" href="https://vlaggenactie.nl/vlaggen/vlaggenaccessoire.html" data-img="" onmouseover="show_product_detail(this)">Vlaggen Accessories</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/gevelstokhouder-zwart.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/g/e/gevelstokhouder_zwart_01.jpeg" onmouseover="show_product_detail(this)">Gevelstokhouder zwart</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/gevelstok-zwart.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/g/e/gevelstok_zwart_01.jpeg" onmouseover="show_product_detail(this)">Gevelstok zwart</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/raamvlag-stok-en-zuignap.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/cache/188088a9a1214c834ad18b1117e66ad8/r/a/raamvlag_stok_zuignap_1.jpg" onmouseover="show_product_detail(this)">Raamvlag stok en zuignap</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/banierhouderset-zwart-27.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/cache/188088a9a1214c834ad18b1117e66ad8/9/f/9f9eb2b8fd3fdbdd.jpg" onmouseover="show_product_detail(this)">Parasolvoet wit met rotator</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/banierhouderset-zwart-25.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/b/3/b3018060078ae8d1.jpg" onmouseover="show_product_detail(this)">Parasolvoet - Wit</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/banierhouderset-zwart-23.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/3/5/354265da1a4b2942.jpg" onmouseover="show_product_detail(this)">Metalen standaard met rotator</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/gevelstok-wit.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/e/7/e7df0c5019934541.png" onmouseover="show_product_detail(this)">Gevelstok - Wit</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/gevelstok-oranje.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/c/d/cd9b37c84e0909a7.png" onmouseover="show_product_detail(this)">Gevelstok - Oranje</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/handystick.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/h/a/handystick_1.jpg" onmouseover="show_product_detail(this)">Handystick</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/banierhouderset-oranje.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/1/e/1e1215ff86810de0.jpg" onmouseover="show_product_detail(this)">Banierhouderset - Oranje</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/banierhouder-verloopstuk-70-mm.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/9/4/944a6ffa6c09667f.jpg" onmouseover="show_product_detail(this)">Banierhouder verloopstuk 70 mm</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/beachpole.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/b/e/beachpole_1.jpg" onmouseover="show_product_detail(this)">Beachpole</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/grondpen-met-rotator.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/g/r/grondpen_1.jpg" onmouseover="show_product_detail(this)">Grondpen met rotator</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/flagfix.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/f/l/flagfix_1.jpg" onmouseover="show_product_detail(this)">Flagfix</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/rotator.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/r/o/rotator_1.jpg" onmouseover="show_product_detail(this)">Rotator</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/voetplaat-met-rotator.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/v/o/voetplaat_1.jpg" onmouseover="show_product_detail(this)">Voetplaat met rotator</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/waterzak.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/w/a/waterzak_2.jpeg" onmouseover="show_product_detail(this)">Waterzak</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/contragewicht.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/c/o/contragewicht_1.jpg" onmouseover="show_product_detail(this)">Contragewicht</a>
    </li>
    <li>
      <a href="https://vlaggenactie.nl/vlaggen/vlaggenaccessoire.html" data-img="" onmouseover="show_product_detail(this)">Bekijk alles</a>
    </li>`;
                
                ht += "<div class='col-lg-2'>" + ht1 + "</div>";
                ht += "<div class='col-lg-2'>" + ht2 + "</div>";
                ht += "<div class='col-lg-2'>" + ht3 + "</div>";
                ht += "<div class='col-lg-2'>" + ht4 + "</div>";
                ht += "<div class='col-lg-2'>" + ht5 + "</div>";

                ht += `<div class='col-lg-2'>
                            <img loading="lazy" id="img_1" src="https://vlaggenactie.nl/pub/media/catalog/product/v/l/vlag_eigenformaat__3.jpg">
                            <br>
                            <br>
                            <a id="a_1">Vlag (Eigen Formaat)</a>
                        </div>`;
                
                document.getElementById("bottom_menu").innerHTML = ht;
                document.getElementById("bottom_menu").style.display = "block";
                
            }
            else if (category_id == 446)
            {
                ht1 = ` <li>
                            <a href='` + domain + `mastvlag.html' data-img='` + domain + `pub/media/catalog/product/m/a/mastvlaggen_1_1.jpg' onmouseover='show_product_detail(this)'>Mastvlag</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `rollup-banners.html' data-img='` + domain + `pub/media/catalog/product/r/o/roll_up_banner_1.jpg' onmouseover='show_product_detail(this)'>Rollup Banners</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `bouwhekdoek.html' data-img='` + domain + `pub/media/catalog/product/b/o/bouwhekdoek_1.jpg' onmouseover='show_product_detail(this)'>Bouwhekdoek</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `spandoek.html' data-img='` + domain + `pub/media/catalog/product/s/p/spandoek_5.jpg' onmouseover='show_product_detail(this)'>Spandoek</a>
                        </li>
                        <li>
                            <a href='` + domain + `beachflags.html' data-img='` + domain + `pub/media/catalog/product/b/e/beachflag_2.jpg' onmouseover='show_product_detail(this)'>Beachflags</a>
                        </li>
                        <li>
                            <a href='` + domain + `naadloos-fotobehang.html' data-img='` + domain + `pub/media/catalog/product/n/a/naadloos_fotobehang_1_1.jpg' onmouseover='show_product_detail(this)'>Naadloos Fotobehang</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `gevelvlag.html' data-img='` + domain + `pub/media/catalog/product/g/e/gevelvlaggen_1_1.jpg' onmouseover='show_product_detail(this)'>Gevelvlag</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `vlag-eigen-formaat.html' data-img='` + domain + `pub/media/catalog/product/v/l/vlag_eigenformaat__3.jpg' onmouseover='show_product_detail(this)'>Vlag (Eigen Formaat)</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `kioskvlag.html' data-img='` + domain + `pub/media/catalog/product/k/i/kioskvlaggen_1.jpg' onmouseover='show_product_detail(this)'>Kioskvlag</a>
                        </li>`;
                        
                ht2 = `<li>
                            <a href='` + domain + `forex.html' data-img='` + domain + `pub/media/catalog/product/f/o/forex_3.jpg' onmouseover='show_product_detail(this)'>Forex</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `blackback-soft.html' data-img='` + domain + `pub/media/catalog/product/b/l/blackback_soft_4.jpg' onmouseover='show_product_detail(this)'>Blackback Soft</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `nederlandse-vlag.html' data-img='` + domain + `pub/media/catalog/product/v/l/vlag_nederland_1.jpg' onmouseover='show_product_detail(this)'>Nederlandse Vlag</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `wimpel-nederland.html' data-img='` + domain + `pub/media/catalog/product/n/e/nederlandse_wimpel_1.jpg' onmouseover='show_product_detail(this)'>Nederlandse Wimpel</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `wimpel-oranje.html' data-img='` + domain + `pub/media/catalog/product/w/i/wimpel_oranje_1.jpg' onmouseover='show_product_detail(this)'>Wimpel Oranje</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `gevelstok-wit.html' data-img='` + domain + `pub/media/catalog/product/e/7/e7df0c5019934541.png' onmouseover='show_product_detail(this)'>Gevelstok - Wit</a>
                        </li>
                        <li>
                            <a href='` + domain + `beachpole.html' data-img='` + domain + `pub/media/catalog/product/b/e/beachpole_1.jpg' onmouseover='show_product_detail(this)'>Beachpole</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `bouwhekdoek-eigen-formaat.html' data-img='` + domain + `pub/media/catalog/product/b/o/bouwhekdoek_4_1.jpg' onmouseover='show_product_detail(this)'>Bouwhekdoek (Eigen Formaat)</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `dekostof.html' data-img='` + domain + `pub/media/catalog/product/d/e/dekostof_1_1.jpg' onmouseover='show_product_detail(this)'>Dekostof</a>
                        </li>`;
                        
                        
                ht3 = ` <li>
                            <a href='` + domain + `flag.html' data-img='` + domain + `pub/media/catalog/product/v/l/vlag_eigenformaat__2_1_.jpg' onmouseover='show_product_detail(this)'>Flag</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `behanglijm-high-5-liter.html' data-img='` + domain + `pub/media/catalog/product/9/1/914562f4d32bcb0d.jpg' onmouseover='show_product_detail(this)'>Behanglijm High 5 Liter</a>
                        </li>
                        
                        <li>
                            <a href='` + domain + `banierhouderset-oranje.html' data-img='` + domain + `pub/media/catalog/product/1/e/1e1215ff86810de0.jpg' onmouseover='show_product_detail(this)'>Banierhouderset - Oranje</a>
                        </li>
                        <li>
                            <a href='` + domain + `baniervlag.html' data-img='` + domain + `pub/media/catalog/product/b/a/baniervlag_1_1.jpg' onmouseover='show_product_detail(this)'>Baniervlag</a>
                        </li>
                        <li>
                            <a href='` + domain + `tarp.html' data-img='` + domain + `pub/media/catalog/product/t/a/tarp_1_2.jpg' onmouseover='show_product_detail(this)'>Tarp</a>
                        </li>
                        <li>
                            <a href='` + domain + `mini-beachflag.html' data-img='` + domain + `pub/media/catalog/product/m/i/minibeachvlag_0123.jpg' onmouseover='show_product_detail(this)'>Mini Beachflag</a>
                        </li>
                        
                        <li>
                          <a href="https://vlaggenactie.nl/baniermast.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/b/a/baniermast.jpg" onmouseover="show_product_detail(this)">Baniermast</a>
                        </li>
                        
                        <li>
                          <a href="https://vlaggenactie.nl/vlaggenmast.html" data-img="https://vlaggenactie.nl/pub/media/catalog/product/v/l/vlaggenmast.jpg" onmouseover="show_product_detail(this)">Vlaggenmast</a>
                        </li>`;
                
               
                ht4 = ""; 
                ht += "<div class='col-lg-2'>" + ht1 + "</div>";
                ht += "<div class='col-lg-2'>" + ht2 + "</div>";
                ht += "<div class='col-lg-2'>" + ht3 + "</div>";
                ht += "<div class='col-lg-2'>" + ht4 + "</div>";
                ht += "<div class='col-lg-2'></div>";

                ht += "<div class='col-lg-2'><img id='img_1'  loading='lazy'  src='" + domain + "pub/media/catalog/product/m/a/mastvlaggen_1_1.jpg' /><br><br><a id='a_1'>Mastvlag</a></div>";
                
                document.getElementById("bottom_menu").innerHTML = ht;
                document.getElementById("bottom_menu").style.display = "block";
            }
            else
            {
                document.getElementById("bottom_menu").style.display = "none";
            }
    } 
    
}

function show_product_detail(obj)
{
    var pname = obj.innerHTML;
    var imagename = obj.getAttribute("data-img");
    
    var link = location.origin;
    document.getElementById("img_1").src = link + "/pub/media/materialprice/media/pattern/loading.gif";
    
    document.getElementById("a_1").innerHTML = pname;
    document.getElementById("img_1").src = imagename;
    
    
}

function show_upload(item_id) 
{
  window.open(window.origin + "/code/productionprocess/fileupload21/qid/" + item_id, "_blank").focus();
}

function show_upload_orderfile(item_id) 
{
  window.open(window.origin + "/code/productionprocess/fileuploadorderfile/qid/" + item_id, "_blank").focus();
}

function show_upload_offerte(item_id)
{
    window.open(window.origin + "/code/productionprocess/fileuploadofferte/qid/" + item_id, "_blank").focus();
}


function login_success_control()
{
    setTimeout(function()
    {
        var lnk = window.location.href;
        if (lnk.indexOf("customer/account/login") !== -1)
        {
            window.location.href = window.location.origin + "/login_fix.php";
        }
    },200);
    
};


require(['jquery'], function($) 
{
  $(document).ready(function() {
    jQuery(window).on("blur focus", function(e) {
        //login_success_control(); 
        
        console.log("111");
        
      var prevType = jQuery(this).data("prevType");
      if (prevType != e.type) { //  reduce double fire issues
        switch (e.type) {
          case "blur":
            //console.log("blur");
            break;
          case "focus":
            //console.log("focus");
            set_fl_upload();
      
            
            
            
            break;
        }
      }
      jQuery(this).data("prevType", e.type);
    })
  });

});

function set_fl_upload() 
{

  var lnk = window.location.href;
  
   if (lnk.indexOf("/offerte") !== -1)
  {
    const currentUrl = window.location.href;  
    const url = new URL(currentUrl);  
    const params = new URLSearchParams(url.search);
    const id = params.get('id');
    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

    ;
    jQuery.ajaxSetup({cache: false});
                  
            jQuery.post(link, {
                id: id,
                m: "gettabledata4"
    
              },
              function(data, status) {
                  
               // console.log(data);
                if (data) {
                  var json = JSON.parse(data);
                  var stat = json.stat;
                  var msg  = json.msg;
                  if (msg === null)
                  {
                        
                  }
                  else
                  {
                      var files = msg.split(",");
                      files.forEach(file => {  
                        //document.getElementById("btn_" + file).className = "btn btn-success";
                        document.getElementById("btn_" + file).innerHTML = "Bestanden ontvangen";
                        document.getElementById("btn_" + file).className = "btn btn-success file_upload_button";
                        document.getElementById("btn_" + file).style.color = "#fff";
                    }); 
                  }
                }
                  
                });
    
    
    
    
  }
  
  
  
  
    if (lnk.indexOf("/bestellingen") !== -1)
  {
    const currentUrl = window.location.href;  
    const url = new URL(currentUrl);  
    const params = new URLSearchParams(url.search);
    const id = params.get('id');
    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

    ;
    jQuery.ajaxSetup({cache: false});
                  
            jQuery.post(link, {
                id: id,
                m: "gettabledata3"
    
              },
              function(data, status) {
                  
               // console.log(data);
                if (data) {
                  var json = JSON.parse(data);
                  var stat = json.stat;
                  var msg  = json.msg;
                  if (msg === null)
                  {
                        
                  }
                  else
                  {
                      var files = msg.split(",");
                      files.forEach(file => {  
                        //document.getElementById("btn_" + file).className = "btn btn-success";
                        document.getElementById("btn_" + file).innerHTML = "Bestanden ontvangen";
                        document.getElementById("btn_" + file).className = "btn btn-success file_upload_button";
                        document.getElementById("btn_" + file).style.color = "#fff";
                    }); 
                  }
                }
                  
                });
    
    
    
    
  }
  
  
  if (lnk.indexOf("/checkout") !== -1)	
  {
    
      var cart = document.getElementById("mini-cart");
      if (cart) {
        var items = new Array();
        var delete_items = cart.getElementsByClassName("delete");
    
        var mini_cart_count = delete_items.length;
    
        var uploaded_products_count = 0;
        var notuploaded_products_count = 0;
    
        var div_products = document.getElementById("div_products");
        if (div_products) {
          var div_defaults = div_products.getElementsByClassName("btn-default");
          var div_notuploaded = div_products.getElementsByClassName("notuploaded");
          var div_successes = div_products.getElementsByClassName("btn-success");
    
          uploaded_products_count = div_successes.length;
          notuploaded_products_count = div_defaults.length + div_notuploaded.length;
        }
    
    
    
        if (delete_items.length > 0) {
          for (var i = 0; i < delete_items.length; i++) {
            var selected_item = delete_items.item(i);
            var selected_item_id = selected_item.getAttribute("data-cart-item");
            items.push(selected_item_id);
          }
          if (items.length > 0) {
         
              var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

            
            jQuery.ajaxSetup(
            {
              cache: false
            });
                  
            jQuery.post(link, {
                ids: JSON.stringify(items),
                m: "gettabledata2"
    
              },
              function(data, status) {
               // console.log(data);
                if (data) {
                  var json = JSON.parse(data);
                  var stat = json.stat;
    
                  if (stat == "ok") {
                    var dat = json.data;
    
                    if (dat.length > 0) {
                      for (var j = 0; j < dat.length; j++) {
                        var id = dat[j]["id"];
                        var html = dat[j]["html"];
                        var software = dat[j]["software"];
                        var hardware = dat[j]["hardware"];
                        
                        var software_fee = parseFloat(dat[j]["software_fee"]);
                        var hardware_fee = parseFloat(dat[j]["hardware_fee"]);
                        
                        //console.log(id + "--software_fee " + software_fee);
                        //console.log(id + "--hardware_fee " + hardware_fee);
                        
                        var software_tr = document.getElementById("tr_software_" + id);
                        if (software_fee > 0)
                        {
                          
                          if (software_tr)
                          {
                            software_tr.getElementsByClassName("td_software_price").item(0).innerHTML = "€ " + software_fee;
                            software_tr.style.display = "table-row";
                          }
                          
                           
                        }
                        else
                        {
                           if (software_tr)	
                          {	
                            software_tr.getElementsByClassName("td_software_price").item(0).innerHTML = "0.00";	
                            software_tr.style.display = "none";	
                            	
                            	
                          }
                        }
                        
                        var hardware_tr = document.getElementById("tr_hardware_" + id);
                        if (hardware_fee > 0)
                        {
                          
                          if (hardware_tr)
                          {
                            hardware_tr.getElementsByClassName("td_hardware_price").item(0).innerHTML = "€ " + hardware_fee ;
                            hardware_tr.style.display = "table-row";
                          }
                        }
                        else
                        {
                          if (hardware_tr)	
                          {	
                            hardware_tr.getElementsByClassName("td_hardware_price").item(0).innerHTML = "0.00";	
                            hardware_tr.style.display = "none";	
                          }
                        }
                        
                        if (html.length > 0) 
                        {
                          if (document.getElementById("btn_" + id))
                          {
                            document.getElementById("btn_" + id).innerHTML = "Bestanden ontvangen";
                            document.getElementById("btn_" + id).className = "btn btn-success file_upload_button";
                            document.getElementById("btn_" + id).style.color = "#fff";
                            
                            document.getElementById("responsive_btn_" + id).innerHTML = "Bestanden ontvangen";
                            document.getElementById("responsive_btn_" + id).className = "btn btn-success file_upload_button";
                            document.getElementById("responsive_btn_" + id).style.color = "#fff";
                            
                            
                            
                            document.getElementById("tr_btn_" + id).getElementsByClassName("step_error").item(0).innerHTML = "";
                          }
                          
                        }
                        else
                        {
                            if (document.getElementById("btn_" + id))
                              {
                                document.getElementById("btn_" + id).innerHTML = "Bestanden uploaden";
                                document.getElementById("btn_" + id).className = "btn notuploaded";
                                document.getElementById("btn_" + id).style.color = "#ff6600";
                                
                                document.getElementById("responsive_btn_" + id).innerHTML = "Bestanden uploaden";
                                document.getElementById("responsive_btn_" + id).className = "btn notuploaded";
                                document.getElementById("responsive_btn_" + id).style.color = "#ff6600";
                                
                                
                                
                                document.getElementById("tr_btn_" + id).getElementsByClassName("step_error").item(0).innerHTML = "upload je bestand";
                              }
                            
                        }
    
    
    
                      }
                    }
        

                    
                  }
    
    
                  if (div_products) {
                    var div_defaults = div_products.getElementsByClassName("btn-default");
                    var div_successes = div_products.getElementsByClassName("btn-success");
    
    
                    var notuploaded_products_count2 = div_defaults.length;
    
                    if (notuploaded_products_count == 1 && notuploaded_products_count2 == 0) {
                      var control = address_control();
    
                      var err = parseInt(control.err);
                      var knm = control.knm;
    
                      if (err > 0) {
                        //show_new_address();
     
    
                        //return;
    
                      }
                    }
                  }
    
    
                }
              });
          }
        }
    
    
    
    
      }
  }
}

function showResMenu() 
{
  var leftMenuRes = document.getElementById("leftMenuRes");
  leftMenuRes.style.left = 0;
  document.getElementById("bgDark").style.left = 0;
}

function hideResMenu() 
{
  var leftMenuRes = document.getElementById("leftMenuRes");
  leftMenuRes.style.left = "-999px";
  document.getElementById("bgDark").style.left = "-999px";
}

function show_date_picker() 
{
  slide_to_div("card2_custom");
  //document.getElementById("card2_custom").scrollIntoView(true); // Bottom

  var gen = jQuery("#other_prices").width();
  var height = jQuery("#div_date_picker").height();
  
  if (height == 0) {
    var btn = document.getElementsByClassName("ui-datepicker-trigger").item(0);
    btn.click();
    document.getElementsByClassName("ui-datepicker").item(0).style.width = gen + "px";
    document.getElementById("div_date_picker").style.height = "405px";
  }

  var other_prices = document.getElementById("other_prices");
  if (other_prices)
  {
    var selected = other_prices.getElementsByClassName("selected");
    if (selected.length > 0)
    {
      selected.item(0).className = "card2";
    }
  }

}

function slide_to_div(div_name) 
{
  var el = document.getElementById(div_name);
  var position = findPos(el);
  var new_position = position - 120;
  window.scrollTo(0, new_position);
  //console.log(position);
}

function checkJSLoaded()
{
    var elements3 = document.getElementsByClassName("action-save-address");
    for (var i = 0; i < elements3.length; i++) {
        //console.log("eklenecek3--" + i);
        elements3[i].addEventListener('click', save_address, false);
    }
    var elements4 = document.getElementsByName("country_id");
    for (var j = 0; j < elements4.length; j++) {
        //console.log("eklenecek3--" + i);
        elements4[j].addEventListener('change', control_country, false);
    }
    
    
}
function control_country()
{
	var country_id_element = document.getElementsByName("country_id");
	country_id_element = country_id_element.item(country_id_element.length - 1);
	var country_id = country_id_element.value;

	if (country_id == "NL")
	{
		var post_code_element = document.getElementsByName("shippingAddress.postcode");
		post_code_element = post_code_element.item(post_code_element.length - 1);
		post_code_element.style.float = "left";
		post_code_element.style.width = "calc(33.3% - 10px)"; 


		var house_number_element = document.getElementsByName("shippingAddress.house_number");
		house_number_element = house_number_element.item(house_number_element.length - 1);
		house_number_element.style.float = "left";
		house_number_element.style.width = "calc(33.3% - 10px)"; 


		var toevoeging_element = document.getElementsByName("shippingAddress.toevoeging");
		toevoeging_element = toevoeging_element.item(toevoeging_element.length - 1);
		toevoeging_element.style.float = "right";
		toevoeging_element.style.width = "calc(33.3% - 10px)"; 	
		
		var address_element = document.getElementsByClassName("a_address");
		address_element = address_element.item(address_element.length - 1);
		
		var address_content = address_element.innerHTML.trim();
		if (address_content.length > 0)
		{
			address_element.style.display = "block";
		}

		var div_handmatig_element = document.getElementsByClassName("div_handmatig");
		div_handmatig_element = div_handmatig_element.item(div_handmatig_element.length - 1);
		div_handmatig_element.style.display = "block";


		var city_element = document.getElementsByName("shippingAddress.city");
		city_element = city_element.item(city_element.length - 1);
		city_element.style.display = "none";

		var street_element = document.getElementsByClassName("field street");
		street_element = street_element.item(street_element.length - 1);
		street_element.style.display = "none";
		
		var streeti_element = document.getElementsByName("shippingAddress.street.0");
		streeti_element = streeti_element.item(streeti_element.length - 1);
		streeti_element.style.display = "none";
		
	}
	else
	{
		var post_code_element = document.getElementsByName("shippingAddress.postcode");
		post_code_element = post_code_element.item(post_code_element.length - 1);
		post_code_element.style.float = "left";
		post_code_element.style.width = "calc(50% - 10px)"; 


		var house_number_element = document.getElementsByName("shippingAddress.house_number");
		house_number_element = house_number_element.item(house_number_element.length - 1);
		house_number_element.style.float = "left";
		house_number_element.style.width = "calc(50% - 10px)"; 


		var toevoeging_element = document.getElementsByName("shippingAddress.toevoeging");
		toevoeging_element = toevoeging_element.item(toevoeging_element.length - 1);
		toevoeging_element.style.float = "right";
		toevoeging_element.style.width = "calc(50% - 10px)"; 	
		
		var address_element = document.getElementsByClassName("a_address");
		address_element = address_element.item(address_element.length - 1);
		address_element.style.display = "none";
	

		var div_handmatig_element = document.getElementsByClassName("div_handmatig");
		div_handmatig_element = div_handmatig_element.item(div_handmatig_element.length - 1);
		div_handmatig_element.style.display = "none";


		var city_element = document.getElementsByName("shippingAddress.city");
		city_element = city_element.item(city_element.length - 1);
		city_element.style.display = "block";
		city_element.style.float = "left";
		city_element.style.width = "calc(50% - 10px)"; 


	
		var street_element = document.getElementsByClassName("field street");
		street_element = street_element.item(street_element.length - 1);
		street_element.style.display = "block";
		
		var streeti_element = document.getElementsByName("shippingAddress.street.0");
		streeti_element = streeti_element.item(streeti_element.length - 1);
		streeti_element.style.display = "block";
	}




}  
    
    
    
function save_address()
{
    setTimeout(function()
    {
        var error_count = document.getElementsByClassName("field-error").length;
        
        var street_div = document.getElementsByName("shippingAddress.street.0").item(0);
        var city_div = document.getElementsByName("shippingAddress.city").item(0);
        
        var street_class = street_div.className;
        var city_class = city_div.className;
        
        
        
        if (street_class.indexOf("error") !== -1 || city_class.indexOf("error") !== -1)
        {
            show_other_addres_items();
        }
        var country_id      = encodeURIComponent(document.getElementsByName("country_id").item(document.getElementsByName("country_id").length - 1).value);
        var postcode        = encodeURIComponent(document.getElementsByName("postcode").item(document.getElementsByName("postcode").length - 1).value);
        var house_number    = encodeURIComponent(document.getElementsByName("house_number").item(document.getElementsByName("house_number").length - 1).value);
        var toevoeging      = encodeURIComponent(document.getElementsByName("toevoeging").item(document.getElementsByName("toevoeging").length - 1).value);
        var street          = encodeURIComponent(document.getElementsByName("street[0]").item(document.getElementsByName("street[0]").length - 1).value);
        var company         = encodeURIComponent(document.getElementsByName("company").item(document.getElementsByName("company").length - 1).value);
        var city            = encodeURIComponent(document.getElementsByName("city").item(document.getElementsByName("city").length - 1).value);
        var firstname       = encodeURIComponent(document.getElementsByName("firstname").item(document.getElementsByName("firstname").length - 1).value);
        var lastname        = encodeURIComponent(document.getElementsByName("lastname").item(document.getElementsByName("lastname").length - 1).value);
        var telephone       = encodeURIComponent(document.getElementsByName("telephone").item(document.getElementsByName("telephone").length - 1).value);
        var customer_email  = encodeURIComponent(document.getElementById("customer-email").value.trim());
        
        var vat             = encodeURIComponent(document.getElementsByName("vat_id").item(document.getElementsByName("vat_id").length - 1).value);
        
        var inp_customeremail = document.getElementById("inp_customeremail").value.trim();
        
        if (inp_customeremail.length > 0 && inp_customeremail.indexOf("@") !== -1)
        {
            customer_email = document.getElementById("inp_customeremail").value.trim();
        }
      
        
        if (error_count == 0)
        {
            var customer_dat = window.checkoutConfig.customerData.length;
            var customer_dat = document.getElementById("inp_customerid").value.trim();
            if (customer_dat.length > 0)
            {
                func_add_address(customer_email,company,firstname,lastname,street,postcode,house_number,toevoeging,city,telephone,country_id,vat);
            }
            else
            {
                func_create_account_with_address(customer_email,company,firstname,lastname,street,postcode,house_number,toevoeging,city,telephone,country_id,vat);
            }
        }
        
        
    },1000);
}
function func_add_address(customer_email,company,firstname,lastname,street,postcode,house_number,toevoeging,city,telephone,country_id,vat)
{
    jQuery.ajaxSetup(
              {
                cache: false
              });
              
            var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


            jQuery.post(link,
            {
              m: "addadress",
              param0: firstname,
              param1: lastname,
              param2: company,
              param3: street,
              param4: postcode,
              param5: house_number,
              param6: toevoeging,
              param7: city,
              param8: country_id,
              param9: telephone,
              param10: customer_email,
              param11: vat
              
              
            },
            function(data, status){
              //console.log(data);
                
                jQuery.post(link,
                {
                    m: "gethousenumbers",
                    cid: document.getElementById("inp_customerid").value.trim()
                },function(data,status)
                {
                    
                    //var dat = data.replace(/"/gi,"'");
                    
                    document.getElementById("inp_housenumbers").value = data;
                    
                    document.getElementById("step10_li1").className = "";
                    document.getElementById("step10_li2").className = "selected";
                    document.getElementById("step10_li3").className = "";
                    
                    var json_data = JSON.parse(data);
                    var first_record = json_data[0];
                    var rec_number = first_record["last_updated"];
                    
                    
                    
                    var active_json_data = json_data[rec_number];
                    var active_json_entity_id   = active_json_data["entity_id"];
                    var active_json_city        = active_json_data["city"];
                    var active_json_company     = active_json_data["company"];
                    var active_json_country_id  = active_json_data["country_id"];
                    var active_json_firstname   = active_json_data["firstname"];
                    var active_json_lastname    = active_json_data["lastname"];
                    var active_json_postcode    = active_json_data["postcode"];
                    var active_json_street      = active_json_data["street"];
                    var active_json_telephone   = active_json_data["telephone"];
                    var active_json_house_number   = active_json_data["house_number"];
                    var active_json_toevoeging   = active_json_data["toevoeging"];
                    
                    
                    var customer_name   = active_json_firstname + " " + active_json_lastname;
                    var street_str      = active_json_street + " " + active_json_house_number + " " + active_json_toevoeging;
                    street_str = street_str.trim();
            
                    var address_str = customer_name + " ," +  active_json_company + " ," +  street_str + " ," + active_json_city + " ," + active_json_postcode + " ," +  active_json_country_id + " ," + active_json_telephone;
                    
                    document.getElementById("div_shipping_address_1").innerHTML = address_str;
                    
                    setTimeout(select_address(active_json_entity_id),500);
                    
                    
                });
              
              
              
              
              
            });  
}
function func_create_account_with_address(customer_email,company,firstname,lastname,street,postcode,house_number,toevoeging,city,telephone,country_id,vat)
{
    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

    jQuery.ajaxSetup(
              {
                cache: false
              });
              
  jQuery.post(link, {
      m: "createcustomersn",
      lastname: lastname,
      firstname: firstname,
      email: customer_email,
      country_id: country_id,
      postcode: postcode,
      city: city,
      street: street,
      telephone: telephone,
      company: company,
      house_number: house_number,
      toevoeging:toevoeging,
      vat:vat
    },
    function(data, status) {
      // (data);
      if (data) {
        var json = JSON.parse(data);
        if (json) {
          var stat = json.stat;
          if (stat == "ok") {
            var email_ = document.getElementById("customer-email").value;
            var pass_ = json.pass;

            document.getElementsByClassName("authentication-wrapper").item(0).getElementsByTagName("button").item(0).click();

            setTimeout(function() {
              document.getElementById("login-email").value = email_;
              document.getElementById("login-password").value = pass_;
              document.getElementsByClassName("action-login").item(0).click();

            }, 500);
          }
        }
      }

    });
}



function controlpostcode()
{
    var city_display = document.getElementsByName("shippingAddress.city").item(0).style.display;
    if (city_display == "none")
    {
        var postcode_element        = document.getElementsByName("postcode").item(document.getElementsByName("postcode").length - 1);
        
        
        var house_number_element    = document.getElementsByName("house_number").item(document.getElementsByName("house_number").length - 1); 
        
        var toevoeging_element      = document.getElementsByName("toevoeging").item(document.getElementsByName("toevoeging").length - 1);
        var street_element          = document.getElementsByName("street[0]").item(document.getElementsByName("street[0]").length - 1);
        var city_element            = document.getElementsByName("city").item(document.getElementsByName("city").length -1 );
        
        
        var postcode = postcode_element.value.trim();
        postcode = postcode.replace(/ /g, '');
        
        var house_number = house_number_element.value.trim();
        
        street_element.value = "";
        city_element.value = "";
        
        var a_address_elements = document.getElementsByClassName("a_address");
        for (var i = 0;i < a_address_elements.length;i++)
        {
            a_address_elements.item(i).innerHTML = "";
        }
        
       
    
      if (postcode.length > 3 && house_number.length > 0) 
      {
        
        var res = get_address_by_post_code(postcode, 0);
        if (res == "ok")
        {
          
            document.getElementsByClassName("div_handmatig").item(document.getElementsByClassName("div_handmatig").length - 1).style.display = "none";    
            document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).style.display = "block";
        }
        else
        {
            document.getElementsByClassName("div_handmatig").item(document.getElementsByClassName("div_handmatig").length - 1).style.display = "block";    
            document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).style.display = "none";
        }
        
        
      } 
      else 
      {
            document.getElementsByClassName("div_handmatig").item(document.getElementsByClassName("div_handmatig").length - 1).style.display = "block";    
            document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).style.display = "none";
      }
    }  
}

function get_address_by_post_code(postcode, num) 
{
    postcode = postcode.trim();
    postcode = postcode.replace(" ", "");
    
    var searchable = 0;
    if (num == 9)
    {
        if (document.getElementById("customer_new_countryPhone").value == "Netherlands")
        {
            var city_element = document.getElementById("customer_new_div_item_city");
            if (city_element.style.display == "none")
            {
                searchable = 1;
            }
            
        }
    }
    if (num == 10)
    {
        if (document.getElementById("customer_edit_countryPhone").value == "Netherlands")
        {
            var city_element = document.getElementById("customer_edit_div_item_city");
            if (city_element.style.display == "none")
            {
                searchable = 1;
            }
            
        }
    }
    if (num == 11)
    {
        if (document.getElementById("sales_edit_countryPhone").value == "Netherlands")
        {
            var city_element = document.getElementById("sales_edit_div_item_city");
            if (city_element.style.display == "none")
            {
                searchable = 1;
            }
            
        }
    }
    if (num == 0)
    {
        var country_element = document.getElementsByName("country_id").item(document.getElementsByName("country_id").length - 1).value;
        var city_element = document.getElementsByName("shippingAddress.city").item(document.getElementsByName("shippingAddress.city").length - 1);
        if (country_element == "NL" && city_element.style.display == "none")
        {
            searchable = 1;
        }   
    }
    
    if (postcode.length > 4 && searchable == 1)
    {
        var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);
        jQuery.ajaxSetup(
              {
                cache: false
              });
              
        jQuery.post(link, {
            postcode: postcode,
            m: "getadressbypostcode"
        },
        function(data, status) 
        {
            if (data) {
            var json = JSON.parse(data);
            if (json) 
            {
                if (json.length > 0) 
                {
                    json = json[0];
                    var street = json.straat;
                    var city = json.plaats;
    
                    if (num == 0)
                    {
                        if (street.length > 0)
                        {
                            var street_element          = document.getElementsByName("street[0]").item(document.getElementsByName("street[0]").length -1 );
                            var city_element            = document.getElementsByName("city").item(document.getElementsByName("city").length - 1);    
                            street_element.value        = street;
                            trigger_an_item3("street[0]");
                    
                    
                            city_element.value          = city;
                            trigger_an_item3("city");
              
                            var house_number_element    = document.getElementsByName("house_number").item(document.getElementsByName("house_number").length - 1); 
                    
                            var house_number            = house_number_element.value.trim();
                            var str = street + " " + house_number + " " + city;
                   
                            document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).style.display = "block";
                            document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).innerHTML = str;
                        }
                        else
                        {
                            var msg = "Er is geen adres gevonden. Controleer de postcode en het huisnummer.";
                            document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).style.display = "block";
                            document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).innerHTML = msg;
                        }
                    }
                    if (num == 9)
                    {
                        if (street.length > 0)
                        {
                            var street_element  = document.getElementById("customer_new_item_street");
                            street_element.value        = street;
                            var city_element    = document.getElementById("customer_new_item_city"); 
                            city_element.value          = city;
                        
                            var house_number_element    = document.getElementById("customer_new_item_housenumber");
                    
                            var house_number            = house_number_element.value.trim();
                            var str = street + " " + house_number + " " + city;
                   
                            document.getElementById("customer_new_a_address").style.display = "block";
                            document.getElementById("customer_new_a_address").innerHTML = str;
                        }
                        else
                        {
                            var msg = "Er is geen adres gevonden. Controleer de postcode en het huisnummer.";
                            document.getElementById("customer_new_a_address").style.display = "block";
                            document.getElementById("customer_new_a_address").innerHTML = msg;
                        }
                        
                    }
                    
                    if (num == 10)
                    {
                        if (street.length > 0)
                        {
                            var street_element  = document.getElementById("customer_edit_item_street");
                            street_element.value        = street;
                            var city_element    = document.getElementById("customer_edit_item_city"); 
                            city_element.value          = city;
                        
                            var house_number_element    = document.getElementById("customer_edit_item_housenumber");
                    
                            var house_number            = house_number_element.value.trim();
                            var str = street + " " + house_number + " " + city;
                   
                            document.getElementById("customer_edit_a_address").style.display = "block";
                            document.getElementById("customer_edit_a_address").innerHTML = str;
                        }
                        else
                        {
                            var msg = "Er is geen adres gevonden. Controleer de postcode en het huisnummer.";
                            document.getElementById("customer_edit_a_address").style.display = "block";
                            document.getElementById("customer_edit_a_address").innerHTML = msg;
                        }
                        
                    }
                    
                    if (num == 11)
                    {
                        if (street.length > 0)
                        {
                            var street_element  = document.getElementById("sales_edit_item_street");
                            street_element.value        = street;
                            var city_element    = document.getElementById("sales_edit_item_city"); 
                            city_element.value          = city;
                        
                            var house_number_element    = document.getElementById("sales_edit_item_housenumber");
                    
                            var house_number            = house_number_element.value.trim();
                            var str = street + " " + house_number + " " + city;
                   
                            document.getElementById("sales_edit_a_address").style.display = "block";
                            document.getElementById("sales_edit_a_address").innerHTML = str;
                        }
                        else
                        {
                            var msg = "Er is geen adres gevonden. Controleer de postcode en het huisnummer.";
                            document.getElementById("sales_edit_a_address").style.display = "block";
                            document.getElementById("sales_edit_a_address").innerHTML = msg;
                        }
                        
                    }
    
                
                    
                }
          }
          return "ok";
        }
        else
        {
          return "fail";
        }

        // (data);
      });
  } 
  else 
  {
    if (num == 0)
    {
        var street_element          = document.getElementsByName("street[0]").item(document.getElementsByName("street[0]").length - 1);
        var city_element            = document.getElementsByName("city").item(document.getElementsByName("city").length - 1); 
        street_element.value = "";
        city_element.value = "";
        
        document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).style.display = "none"
        document.getElementsByClassName("a_address").item(document.getElementsByClassName("a_address").length - 1).innerHTML = "";
    } 
    if (num == 10)
    {
        var street_element  = document.getElementById("customer_edit_item_street");
        street_element.value        = "";
        
        var city_element    = document.getElementById("customer_edit_item_city"); 
        city_element.value          = "";
                        

        var str = "";
                   
        document.getElementById("customer_edit_a_address").style.display = "block";
        document.getElementsByClassName("customer_edit_a_address").innerHTML = str;
    }
        
  }
}

function trigger_an_item(item_name) {
  e = jQuery.Event('keyup');
  e.keyCode = 20; // enter
  jQuery('[name="' + item_name + '"]').first().trigger(e);
}

function trigger_an_item2(item_name) {
  e = jQuery.Event('keyup');
  e.keyCode = 20; // enter
  jQuery('[name="' + item_name + '"]').first().next().trigger(e);
}

function trigger_an_item3(item_name)
{
    const e = new Event("change");
    const element = document.getElementsByName(item_name).item(document.getElementsByName(item_name).length - 1);
    element.dispatchEvent(e);
}



window.addEventListener('load', function () {

  
  setTimeout(function(){
      var el = document.getElementById("maincontent");
      el.addEventListener("mouseover",hide_menu2);
      
      var breadcrumbs = document.getElementsByClassName("breadcrumbs")
      if (breadcrumbs.length > 0)
      {
          breadcrumbs.item(0).addEventListener("mouseover",hide_menu2);
      }
      
      var up_element = document.getElementById("logo_header_up");
      up_element.addEventListener("mouseover",hide_menu2);

      
      
  },500);
  
  
    setTimeout(function(){
    
      var prev_el = document.getElementsByClassName("owl-prev");
      if (prev_el.length > 0)
      {
           prev_el.item(0).addEventListener("mouseover",hide_menu2);
      }
      
      var next_el = document.getElementsByClassName("owl-next");
      if (next_el.length > 0)
      {
           next_el.item(0).addEventListener("mouseover",hide_menu2);
      }
      
      var slider_el = document.getElementsByClassName("sm-imageslider");
      if (slider_el.length > 0)
      {
           slider_el.item(0).addEventListener("mouseover",hide_menu2);
      }
      
  },2000);
  
  
  
})





function set_tab()
{

    var owl_items = document.getElementsByClassName("owl-item");
    
    
    for (var i = 0;i < owl_items.length;i++)
    {
        var active_div = owl_items.item(i).getElementsByTagName("div").item(0);
        var active_div_id = active_div.getAttribute("id");
        
        if (active_div.getElementsByClassName("cI-1").length > 0)
        {
            if (active_div_id !== "menu_495")
            {
                active_div.style.backgroundColor = "#fff";
                active_div.style.borderRadius = "6px";
                active_div.getElementsByClassName("cI-1").item(0).style.display = "block";
                active_div.getElementsByClassName("cI-2").item(0).style.display = "none";
                active_div.getElementsByClassName("cat-link").item(0).style.color = "#004161";
            }
            
        }
    }
    
    
    
    
    var active_cat = document.getElementById("inp_knm_json").value;
    if (active_cat !== "495")
    {
         document.getElementById("menu_" + active_cat).style.backgroundColor = "#f60";
        document.getElementById("menu_" + active_cat).style.borderRadius = "6px";
        document.getElementById("menu_" + active_cat).getElementsByClassName("cI-1").item(0).style.display = "none";
        document.getElementById("menu_" + active_cat).getElementsByClassName("cI-2").item(0).style.display = "block";
        document.getElementById("menu_" + active_cat).getElementsByClassName("cat-link").item(0).style.color = "#fff";
    }
   
    
    
    
    
    
}

function get_active_json(json,category_id)
{
    var snc;
    for (var i = 0;i < json.length;i++)
    {
        var cur_json = json[i];
        var cur_category_id = cur_json["category_id"];
        if (category_id == cur_category_id)
        {
            snc = cur_json;
        }
    }
    return snc;
}


function hide_menu(obj)
{
    //console.log("none");
    //document.getElementById("bottom_menu").style.display = "none";
}

function hide_menu2()
{
    
    document.getElementById("bottom_menu").style.display = "none";
    
     var owl_items = document.getElementsByClassName("owl-item");   
    for (var i = 0;i < owl_items.length;i++)
    {
        var active_div = owl_items.item(i).getElementsByTagName("div").item(0);
        var active_div_id = active_div.getAttribute("id");
  
        
        if ( active_div.getElementsByClassName("cI-1").length > 0)
        {
            if (active_div_id !== "menu_495")
            {
                active_div.style.backgroundColor = "#fff";
                active_div.style.borderRadius = "6px";
                active_div.getElementsByClassName("cI-1").item(0).style.display = "block";
                active_div.getElementsByClassName("cI-2").item(0).style.display = "none";
                active_div.getElementsByClassName("cat-link").item(0).style.color = "#004161";
            }
            
        }
        
    }
}

clean_storage();
var shipping_data;

var custom_prices;

//document.querySelectorAll("input:-internal-autofill-selected").forEach(function(item){item.value = '';})

function get_opt_custom_flag()
{
    var customer_id = document.getElementById("inp_customerid").value;
    var inp_pid = document.getElementById("inp_pid").value;
    var pname = document.getElementById("inp_pname").value;

    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor(Math.random() * 1000 + 1);

    const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
            var data = this.responseText;
            
            
            if (data)
            {
                var json = JSON.parse(data);
                var data_sizes = json.options;
                custom_prices = json.prices;

                var first_price = custom_prices[0];
                var f_size = first_price["atr_1"];
                var f_price = first_price["price"];
     


                document.getElementById("div_label_0").innerHTML = "<h4>Afmeting (Hoogte x Breedte)</h4>";
                var sizes = "";
                for (var i = 0;i < data_sizes.length;i++)
                {
                    var active_size = data_sizes[i];
                    active_size = active_size.trim();
                    active_size = active_size.replace(" ","");
                    if (active_size == f_size)
                    {
                        sizes += "<a onclick='set_size_item_selected(" + i + ")' class='div_size_item_selected' id='div_size_item_"+ i +"'>" + data_sizes[i]  + "</a>";
                    }
                    else
                    {
                        sizes += "<a onclick='set_size_item_selected(" + i + ")' class='div_size_item' id='div_size_item_"+ i +"'>" + data_sizes[i]  + "</a>";
                    
                    }

                }
                sizes += "<a class='div_size_item2' id='a_other_sizes' style='display:none'><span>Andere</span><br><span>formaten</span></a>";

                document.getElementById("div_content_0").innerHTML = sizes;

                var base_url = window.location.origin;

                var ht = `<button onclick="add_to_cart()" class="button btn-info btn-lg btn-block button--fw _has-icon" 
                style="width:100%; background-color: #f57f28">
            <div id="btn_click_div11" style="display: block; text-transform: none; font-weight:bold;">
                <span class="text-white">
                    <img src="` + base_url + `/pub/media/icon/cart.svg" style="margin: -5px 0 0 0;" width="16">
                <a style="color:#fff !important;margin-left:5px">Toevoegen aan winkelwagen</a>
            </span></div> 
            <div id="btn_click_div21" style="display: none;">
                <img style="width:30px" src="` + base_url + `/pub/media/materialprice/media/pattern/loading.gif"></div>
        </button>`;


                document.getElementById("div_product_accessories").innerHTML = ht;

                document.getElementById("div_content_0").style.height = "100px";
                document.getElementById("div_content_0").style.overflow = "hidden";
                
                document.getElementById("div_label_1").innerHTML = "<h4>Aantal</h4>";
                document.getElementById("div_label_1").style.marginTop = "10px";
                
                document.getElementById("div_content_1").innerHTML = `<div id='div_aantal'><input type="text" autocomplete="off" 
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" onkeyup="document.getElementById('qty').value = this.value;" 
                class="form-control" placeholder="" style="float:left;width:70px;text-align:center;" id="inp_amount2" aria-label="amount" value="1"  aria-describedby="basic-addon2"></div>`;
                
                document.getElementById("div_label_0").className = "jumbotron2";
                document.getElementById("div_label_0").style.display = "block";

                document.getElementById("div_label_1").className = "jumbotron2";
                document.getElementById("div_label_1").style.display = "block";

                document.getElementById("div_content_0").style.display = "block";
                document.getElementById("div_content_1").style.display = "block";

                document.getElementById("product_price").style.display = "block";


                document.getElementById("product_price").innerHTML =  "€ "  +  f_price;
                
                setTimeout(function(){
                    var cont = overflow_control();
                    if (cont == true)
                    {
                        document.getElementById("a_other_sizes").style.display  = "block";
                    }

                },500);
            }


        
      }
      xhttp.open("POST", link);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("m=getcustomflagoption&pid="+  inp_pid +"&pname=" + pname + "&customerid=" + customer_id);


}



function get_opt_tuindoek()
{
    var customer_id = document.getElementById("inp_customerid").value;
    var inp_pid = document.getElementById("inp_pid").value;
    var pname = document.getElementById("inp_pname").value;

    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor(Math.random() * 1000 + 1);

    const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
            var data = this.responseText;
            
            
            if (data)
            {
                var json = JSON.parse(data);
                var data_sizes = json.options;
                custom_prices = json.prices;

                var first_price = custom_prices[0];
                var f_size = first_price["atr_1"];
                var f_price = first_price["price"];
     


                document.getElementById("div_label_0").innerHTML = "<h4>Afmeting (Hoogte x Breedte)</h4>";
                var sizes = "";
                for (var i = 0;i < data_sizes.length;i++)
                {
                    var active_size = data_sizes[i];
                    active_size = active_size.trim();
                    active_size = active_size.replace(" ","");
                    if (active_size == f_size)
                    {
                        sizes += "<a onclick='set_size_item_selected(" + i + ")' class='div_size_item_selected' id='div_size_item_"+ i +"'>" + data_sizes[i]  + "</a>";
                    }
                    else
                    {
                        sizes += "<a onclick='set_size_item_selected(" + i + ")' class='div_size_item' id='div_size_item_"+ i +"'>" + data_sizes[i]  + "</a>";
                    
                    }

                }
                sizes += "<a class='div_size_item2' id='a_other_sizes' style='display:none'><span>Andere</span><br><span>formaten</span></a>";

                document.getElementById("div_content_0").innerHTML = sizes;

                var base_url = window.location.origin;

                var ht = `<button onclick="add_to_cart()" class="button btn-info btn-lg btn-block button--fw _has-icon" 
                style="width:100%; background-color: #f57f28">
            <div id="btn_click_div11" style="display: block; text-transform: none; font-weight:bold;">
                <span class="text-white">
                    <img src="` + base_url + `/pub/media/icon/cart.svg" style="margin: -5px 0 0 0;" width="16">
                <a style="color:#fff !important;margin-left:5px">Toevoegen aan winkelwagen</a>
            </span></div> 
            <div id="btn_click_div21" style="display: none;">
                <img style="width:30px" src="` + base_url + `/pub/media/materialprice/media/pattern/loading.gif"></div>
        </button>`;


                document.getElementById("div_product_accessories").innerHTML = ht;

                document.getElementById("div_content_0").style.height = "100px";
                document.getElementById("div_content_0").style.overflow = "hidden";
                
                document.getElementById("div_label_1").innerHTML = "<h4>Aantal</h4>";
                document.getElementById("div_label_1").style.marginTop = "10px";
                
                document.getElementById("div_content_1").innerHTML = `<div id='div_aantal'><input type="text" autocomplete="off" 
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" onkeyup="document.getElementById('qty').value = this.value;" 
                class="form-control" placeholder="" style="float:left;width:70px;text-align:center;" id="inp_amount2" aria-label="amount" value="1"  aria-describedby="basic-addon2"></div>`;
                
                document.getElementById("div_label_0").className = "jumbotron2";
                document.getElementById("div_label_0").style.display = "block";

                document.getElementById("div_label_1").className = "jumbotron2";
                document.getElementById("div_label_1").style.display = "block";

                document.getElementById("div_content_0").style.display = "block";
                document.getElementById("div_content_1").style.display = "block";

                document.getElementById("product_price").style.display = "block";


                document.getElementById("product_price").innerHTML =  "€ "  +  f_price;
                
                setTimeout(function(){
                    var cont = overflow_control();
                    if (cont == true)
                    {
                        document.getElementById("a_other_sizes").style.display  = "block";
                    }

                },500);
            }


        
      }
      xhttp.open("POST", link);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("m=gettuindoekoption&pid="+  inp_pid +"&pname=" + pname + "&customerid=" + customer_id);


}




function set_size_item_selected(num)
{
    for (i = 0 ;i < 50;i++)
    {
        var item = "div_size_item_" + i;
        if (document.getElementById(item))
        {
            document.getElementById(item).className = "div_size_item";
        }
    }
    document.getElementById("div_size_item_" + num).className = "div_size_item_selected";
    var requried_price = custom_prices[num];
    var price = requried_price.price;
    document.getElementById("product_price").innerHTML = "€ " + price;

}


function overflow_control() {
    var element = document.getElementById("div_content_0");
    var cont = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

  return cont;
}

function customer_edit_save_address()
{
    var customer_id = encodeURIComponent(document.getElementById("inp_customerid").value);
    var address_id  = encodeURIComponent(document.getElementById("inp_edit_address").value);
    var country_id  = encodeURIComponent(document.getElementById("customer_edit_countryPhone").value);
    var street      = encodeURIComponent(document.getElementById("customer_edit_item_street").value);
    var postcode    = encodeURIComponent(document.getElementById("customer_edit_item_postalcode").value);
    var house_number = encodeURIComponent(document.getElementById("customer_edit_item_housenumber").value);
    var toevoeging  = encodeURIComponent(document.getElementById("customer_edit_item_toevoeging").value);
    var city        = encodeURIComponent(document.getElementById("customer_edit_item_city").value);
    var company     = encodeURIComponent(document.getElementById("customer_edit_item_company").value);
    var firstname   = encodeURIComponent(document.getElementById("customer_edit_item_firstname").value);
    var lastname    = encodeURIComponent(document.getElementById("customer_edit_item_lastname").value);
    var telephone   = encodeURIComponent(document.getElementById("customer_edit_item_phone").value);
    var billing_address = document.getElementById("customer_edit_item_billingaddress").checked;
    if (billing_address == true)
    {
      billing_address = 1;
    }
    else
    {
      billing_address = 0;
    }
    
    var shipping_address = document.getElementById("customer_edit_item_shippingaddress").checked;
    if (shipping_address == true)
    {
      shipping_address = 1;
    }
    else
    {
      shipping_address = 0;
    }
    

    var link = location.origin + "/code/productionprocess/getdat.php";
   
    jQuery.post(link, {
      m: "editsaveaddress",
      param0: customer_id,
      param1: address_id,
      param2: country_id,
      param3: street,
      param4: postcode,
      param5: house_number,
      param6: toevoeging,
      param7: city,
      param8: company,
      param9: firstname,
      param10: lastname,
      param11: telephone,
      param12: billing_address,
      param13: shipping_address
    },
    function(data, status) {
      location.reload();
    });
}


function sales_edit_save_address()
{
    var customer_id = encodeURIComponent(document.getElementById("inp_customerid").value);
    var address_id  = encodeURIComponent(document.getElementById("inp_sales_address_id").value);
    var country_id  = encodeURIComponent(document.getElementById("sales_edit_countryPhone").value);
    var street      = encodeURIComponent(document.getElementById("sales_edit_item_street").value);
    var postcode    = encodeURIComponent(document.getElementById("sales_edit_item_postalcode").value);
    var house_number = encodeURIComponent(document.getElementById("sales_edit_item_housenumber").value);
    var toevoeging  = encodeURIComponent(document.getElementById("sales_edit_item_toevoeging").value);
    var city        = encodeURIComponent(document.getElementById("sales_edit_item_city").value);
    var company     = encodeURIComponent(document.getElementById("sales_edit_item_company").value);
    var firstname   = encodeURIComponent(document.getElementById("sales_edit_item_firstname").value);
    var lastname    = encodeURIComponent(document.getElementById("sales_edit_item_lastname").value);
    var telephone   = encodeURIComponent(document.getElementById("sales_edit_item_phone").value);
    
    var link = location.origin + "/code/productionprocess/getdat.php";

  
    jQuery.post(link, {
      m: "saleseditsaveaddress",
      param0: customer_id,
      param1: address_id,
      param2: country_id,
      param3: street,
      param4: postcode,
      param5: house_number,
      param6: toevoeging,
      param7: city,
      param8: company,
      param9: firstname,
      param10: lastname,
      param11: telephone
 
    },
    function(data, status) {
      location.reload();
    });
}



function customer_new_account()
{
  var modal = document.getElementById("myModalcustomer_new");
  var iti__selected_flag = modal.getElementsByClassName("iti__selected-flag");
  if (iti__selected_flag.length > 0)
  {
    iti__selected_flag = iti__selected_flag.item(0);
    var title = iti__selected_flag.getAttribute("title");
    title = title.split("(");
    title = title[0];
    title = title.trim();
    title = title.split(":")[0];
    title = title.trim();

    document.getElementById("customer_new_countryPhone").value = title;
  }
  
  document.getElementById("myModalcustomer_new_btn").click();
}


function customer_new_save_address()
{
  var customer_email = document.getElementById("inp_customeremail").value.trim();
  
  var firstname     = document.getElementById("customer_new_item_firstname").value.trim();
  var lastname      = document.getElementById("customer_new_item_lastname").value.trim();
  var company       = document.getElementById("customer_new_item_company").value.trim();
  var street        = document.getElementById("customer_new_item_street").value.trim();
  var postcode      = document.getElementById("customer_new_item_postalcode").value.trim();
  var house_number  = document.getElementById("customer_new_item_housenumber").value.trim();
  var toevoeging    = document.getElementById("customer_new_item_toevoeging").value.trim();
  var city          = document.getElementById("customer_new_item_city").value.trim();


  var country_id    = document.getElementById("customer_new_countryPhone").value.trim();
  var telephone     = document.getElementById("customer_new_item_phone").value.trim();



  if (firstname.length == 0) {
    alert("firstname is required");
    return;
  }
  if (lastname.length == 0) {
    alert("lastname is required");
    return;
  }
  if (company.length == 0) {
    //alert("company is required");
    //return;
    company = ".";
  }
  var address = "";
  if (street.length > 0) {
    address = street;
  } else {
    address = postcode + " " + house_number + " " + toevoeging;
  }

  if (address.length == 0) {
    alert("address is required");
    return;
  }
  //if (city.length == 0)
  // {
  //alert("city is required");
  //return;
  //}
  if (postcode.length == 0) {
    alert("postcode is required");
    return;
  }
  if (country_id.length == 0) {
    alert("country_id is required");
    return;
  }
  if (telephone.length == 0) {
    alert("telephone is required");
    return;
  }

  var html = firstname + " " + lastname + ", ";
  html += company + ", ";
  html += address + ", ";

  html += city + "," + postcode + "," + country_id + ", ";
  html += telephone;

  var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);
  
  jQuery.ajaxSetup(
              {
                cache: false
              });
  
  
              
              
  jQuery.post(link, {
      m: "addadress",
      param0: firstname,
      param1: lastname,
      param2: company,
      param3: street,
      param4: postcode,
      param5: house_number,
      param6: toevoeging,
      param7: city,
      param8: country_id,
      param9: telephone,
      param10: customer_email
    },
    function(data, status) {
      location.reload();
    });
  
  
}
function reorder(order_id)
{
  document.getElementsByClassName("loading-mask-shopby").item(0).style.display = "block";
    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

    var post_data = "m=reorder&oid=" + order_id;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
      var data = this.responseText;
      var new_link = window.location.origin + "/checkout/#shipping";
      window.location.href = new_link;
    }
    xhttp.open("POST", link);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(post_data); 
}




function cancel_order()
{
  var order_id = document.getElementById("inp_order_id").value;
  var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


  var post_data = "m=cancelcontrolmain&oid=" + order_id;
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {

      var data = this.responseText;
      location.reload();
      
      
  }    
  xhttp.open("POST", link);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(post_data);    
}

function sales_edit_address(address_id)
{

  //document.getElementById("inp_edit_address").value = address_id;
  var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

  
  var post_data = "m=saleseditaddress&aid=" + address_id;
  
    
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {

      var data = this.responseText;
     
      console.log(data);
      
   
      
      
      
      if (data)
      {
        var json = JSON.parse(data);
        var stat = json.status;
        if (stat == "ok")
        {
          var company         = json.company;
          var country_id      = json.country_id;
          var country_name    = json.country_name;
          var city            = json.city; 
          var firstname       = json.firstname;  
          var lastname        = json.lastname; 
          var street          = json.street; 
          var telephone       = json.telephone;
          var postcode        = json.postcode;
          var house_number    = json.house_number;
          var toevoeging      = json.toevoeging;
          
          
          
          var customer_edit_a_address_text = street + " " + house_number;
          customer_edit_a_address_text = customer_edit_a_address_text.trim();
          customer_edit_a_address_text = customer_edit_a_address_text + " , " + city;
          
          document.getElementById("sales_edit_a_address").innerHTML = customer_edit_a_address_text;
          
          if (toevoeging === undefined)
          {
            toevoeging = "";
          }
          if (house_number === undefined)
          {
            house_number = "";
          }
          
        
          var iti = intlTelInput(document.getElementById("sales_edit_countryPhone"));
          iti.setCountry(country_id);
        
          document.getElementById("sales_edit_countryPhone").value = country_name;
          
          
          document.getElementById("sales_edit_item_company").value   = company;
          document.getElementById("sales_edit_item_firstname").value = firstname;
          document.getElementById("sales_edit_item_lastname").value  = lastname;
          document.getElementById("sales_edit_item_street").value    = street;
          document.getElementById("sales_edit_item_phone").value = telephone;
          document.getElementById("sales_edit_item_postalcode").value  = postcode;
          document.getElementById("sales_edit_item_housenumber").value = house_number;
          
          document.getElementById("sales_edit_item_city").value = city;
          document.getElementById("sales_edit_item_toevoeging").value = toevoeging;
        
          
          
          document.getElementById("myModalcustomer_sales_edit_address_btn").click();
        
        
        }
        
        
      }
      
    
    
    
  }
  xhttp.open("POST", link);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(post_data);
  
  
  
}




function customer_edit_address(address_id)
{
  document.getElementById("inp_edit_address").value = address_id;
  var customer_id = document.getElementById("inp_customerid").value.trim();
  var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

  
  var post_data = "m=editaddress&cid=" + customer_id + "&aid=" + address_id;
  
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {

      var data = this.responseText;
      console.log(data);
      
   
      
      
      
      if (data)
      {
        var json = JSON.parse(data);
        var stat = json.status;
        if (stat == "ok")
        {
          var company         = json.company;
          var country_id      = json.country_id;
          var country_name    = json.country_name;
          var city            = json.city; 
          var firstname       = json.firstname;  
          var lastname        = json.lastname; 
          var street          = json.street; 
          var telephone       = json.telephone;
          var postcode        = json.postcode;
          var house_number    = json.house_number;
          var toevoeging      = json.toevoeging;
          
          
          
          var customer_edit_a_address_text = street + " " + house_number;
          customer_edit_a_address_text = customer_edit_a_address_text.trim();
          customer_edit_a_address_text = customer_edit_a_address_text + " , " + city;
          
          document.getElementById("customer_edit_a_address").innerHTML = customer_edit_a_address_text;
          
          if (toevoeging === undefined)
          {
            toevoeging = "";
          }
          if (house_number === undefined)
          {
            house_number = "";
          }
          
          var default_billing = json.default_billing;
          var default_shipping = json.default_shipping;
          var iti = intlTelInput(document.getElementById("customer_edit_countryPhone"));
          iti.setCountry(country_id);
        
          document.getElementById("customer_edit_countryPhone").value = country_name;
          
          
          document.getElementById("customer_edit_item_company").value   = company;
          document.getElementById("customer_edit_item_firstname").value = firstname;
          document.getElementById("customer_edit_item_lastname").value  = lastname;
          document.getElementById("customer_edit_item_street").value    = street;
          document.getElementById("customer_edit_item_phone").value = telephone;
          document.getElementById("customer_edit_item_postalcode").value  = postcode;
          document.getElementById("customer_edit_item_housenumber").value = house_number;
          
          document.getElementById("customer_edit_item_city").value = city;
          document.getElementById("customer_edit_item_toevoeging").value = toevoeging;
          if (default_billing == 1)
          {
            document.getElementById("customer_edit_item_billingaddress").checked = true;
          }
          else
          {
            document.getElementById("customer_edit_item_billingaddress").checked = false;
          }
          if (default_shipping == 1)
          {
            document.getElementById("customer_edit_item_shippingaddress").checked = true;
          }
          else
          {
            document.getElementById("customer_edit_item_shippingaddress").checked = false;
          }
          
          
          //if nl
          
          if (country_id == "NL")
          {
                
                document.getElementById("customer_edit_div_item_street").style.display = "none";
                document.getElementById("customer_edit_div_item_city").style.display = "none";
                document.getElementById("customer_edit_a_address").style.display = "block";
    
                document.getElementById("customer_edit_div_item_postalcode").className = "form-outline mb-4 col-md-4";
                document.getElementById("customer_edit_div_item_housenumber").className = "form-outline mb-4 col-md-4";
                document.getElementById("customer_edit_div_item_toevoeging").className = "form-outline mb-4 col-md-4";
                document.getElementById("customer_edit_div_item_city").className = "form-outline mb-4 col-md-4";
                document.getElementById("customer_edit_div_handmatig").style.display = "block";
                
          }
          else
          {
                document.getElementById("customer_edit_div_item_street").style.display = "block";
                document.getElementById("customer_edit_div_item_city").style.display = "block";
                document.getElementById("customer_edit_a_address").style.display = "none";
                document.getElementById("customer_edit_div_handmatig").style.display = "none";
                document.getElementById("customer_edit_div_item_city").style.padding = "0 5px 0 0 ";
    
                document.getElementById("customer_edit_div_item_postalcode").className = "form-outline mb-6 col-md-6";
                document.getElementById("customer_edit_div_item_housenumber").className = "form-outline mb-6 col-md-6";
                document.getElementById("customer_edit_div_item_toevoeging").className = "form-outline mb-6 col-md-6";
                document.getElementById("customer_edit_div_item_city").className = "form-outline mb-12 col-md-12";
          }
            



            
          
          //if not nl
          
          document.getElementById("myModalcustomer_edit_address_btn").click();
        
        
        }
        
        
      }
      
    
    
    
  }
  xhttp.open("POST", link);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(post_data);
  
  
  
}




function show_accordion(obj)
{
  var i_element = obj.getElementsByTagName("i").item(0);
    var i_element_class = i_element.className;
    if (i_element_class == "right_arrow")
    {
    	i_element.className = "down_arrow";
    }
    if (i_element_class == "down_arrow")
    {
    	i_element.className = "right_arrow";
    }
    
    var panel = obj.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
}



function clean_storage()
{
  var active_link = window.location.href;
   
  if (typeof(Storage) !== "undefined" && active_link.indexOf("checkout/") == -1) 
  {
    localStorage.setItem("item_id","");
    localStorage.setItem("billing_check","");
    localStorage.setItem("billing_firstname","");
    localStorage.setItem("billing_lastname","");
    localStorage.setItem("billing_company","");
    localStorage.setItem("billing_street","");
    localStorage.setItem("billing_postcode","");
    localStorage.setItem("billing_house_number","");
    localStorage.setItem("billing_toevoeging","");
    localStorage.setItem("billing_city","");
    localStorage.setItem("billing_telephone","");
    localStorage.setItem("billing_country_id","");
    localStorage.setItem("shipping_firstname","");
    localStorage.setItem("shipping_lastname","");
    localStorage.setItem("shipping_company","");
    localStorage.setItem("shipping_street","");
    localStorage.setItem("shipping_postcode","");
    localStorage.setItem("shipping_housenumber","");
    localStorage.setItem("shipping_toevoeging","");
    localStorage.setItem("shipping_city","");
    localStorage.setItem("shipping_country_id","");
    localStorage.setItem("shipping_telephone","");
    localStorage.setItem("sender","");
    localStorage.setItem("sender_firstname","");
    localStorage.setItem("sender_lastname","");
    localStorage.setItem("sender_company","");
    localStorage.setItem("sender_street","");
    localStorage.setItem("sender_postcode","");
    localStorage.setItem("sender_house_number","");
    localStorage.setItem("sender_toevoeging","");
    localStorage.setItem("sender_city","");
    localStorage.setItem("sender_telephone","");
    localStorage.setItem("sender_country_id","");
    localStorage.setItem("total_producten","");
    localStorage.setItem("total_producten_excl","");
    localStorage.setItem("total_producten_incl","");
    localStorage.setItem("card_shipping_price","");
    localStorage.setItem("card_shipping_text","");
    localStorage.setItem("pakbon","");
    localStorage.setItem("pakbon_loc","");
    localStorage.setItem("card_day","");
    localStorage.setItem("card_date","");
    localStorage.setItem("card_extra_fee","");
    localStorage.setItem("reference","");
    localStorage.setItem("payment_method","");
  }
}

function set_country_name(element_name,country_code)
{
  document.getElementById(element_name).value = country_code;
}


require(['jquery'], function($) {
  $(".faq-question").on("click", function() {
    if ($(this).parent().hasClass("active")) {
      $(this).next().slideUp();
      $(this).parent().removeClass("active");
    } else {
      $(".faq-answer").slideUp();
      $(".faq-singular").removeClass("active");
      $(this).parent().addClass("active");
      $(this).next().slideDown();
    }
  });
  
  
  
  // seÃ§ilen Ã¼lkenin telefon kodunu input iÃ§ine yazdÄ±r
  $(document).ready(function() {
    var active_link = window.location.href;
    if ((active_link.indexOf("checkout") !== -1 && active_link.indexOf("checkout/cart") == -1) || active_link.indexOf("customer/address/") !== -1 || active_link.indexOf("customer/account") !== -1 || active_link.indexOf("bestellingen") !== -1) {
      setTimeout(function() {
        var script1 = document.createElement('script');
        //script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/intlTelInput.min.js';
        script1.src = window.location.origin + "/pub/media/js/intl.js";
        
        
        script1.type = 'text/javascript';

        // add an onload handler
        script1.onload = function() {

          // load the rest of the scripts here

          // Javascript ile input id'sinden inputu deÄŸiÅŸkene ata 
         
          if (document.querySelector(".countryPhone"))
          {
            var telefonKodu = document.querySelector(".countryPhone");
            window.intlTelInput(telefonKodu, ({
              // bu alana Ã¶zel ayarlar ekleyebilirsiniz
              initialCountry: "nl"
            }));
          }
          
         
         
          if (document.querySelector(".countryPhone2"))
          {
            var telefonKodu2 = document.querySelector(".countryPhone2");
            window.intlTelInput(telefonKodu2, ({
              // bu alana Ã¶zel ayarlar ekleyebilirsiniz
              initialCountry: "nl"
            }));
          }
         
          if (document.querySelector(".countryPhone3"))
          {
            var telefonKodu3 = document.querySelector(".countryPhone3");
            window.intlTelInput(telefonKodu3, ({
              // bu alana Ã¶zel ayarlar ekleyebilirsiniz
              initialCountry: "nl"
            }));
          }
          
          if (document.querySelector(".countryPhone4"))
          {
            var telefonKodu4 = document.querySelector(".countryPhone4");
            window.intlTelInput(telefonKodu4, ({
              // bu alana Ã¶zel ayarlar ekleyebilirsiniz
              initialCountry: "nl"
            }));
          }
          
          if (document.querySelector(".countryPhone10"))
          {
            var telefonKodu10 = document.querySelector(".countryPhone10");
            window.intlTelInput(telefonKodu10, ({
              // bu alana Ã¶zel ayarlar ekleyebilirsiniz
              initialCountry: "nl"
            }));
          }
          if (document.querySelector(".countryPhone11"))
          {
            var telefonKodu11 = document.querySelector(".countryPhone11");
            window.intlTelInput(telefonKodu11, ({
              // bu alana Ã¶zel ayarlar ekleyebilirsiniz
              initialCountry: "nl"
            }));
          }

          $('.iti__flag-container').on('DOMSubtreeModified',function()
          {
            console.log("changed");
          });

          $('.iti__flag-container').click(function() {
            var countryCode = this.getElementsByClassName("iti__selected-flag");
           /* if (countryCode)
            {
              if (countryCode.length > 0)
              {
                countryCode = countryCode.item(0).getAttribute("title");
                countryCode = countryCode.replace(/[^0-9]/g, '');
    
                var ul = document.getElementById("iti-0__country-listbox");
                var lis = ul.getElementsByTagName("li");
                var out = "";
                for (var i = 0; i < lis.length; i++) {
                  var active_li = lis.item(i);
                  var atr = active_li.getAttribute("data-dial-code");
                  if (atr == countryCode) {
    
    
                    var span = active_li.getElementsByClassName("iti__country-name").item(0);
                    out = span.textContent;
                    out = out.split("(")[0];
    
                  }
    
                }
                this.parentElement.getElementsByClassName("country").item(0).value = out;
            
              }
            }*/




          });


        }

        document.getElementsByTagName('Body').item(0).appendChild(script1);
      }, 500);
    };




  });
});


function ValidateEmail(inputText)
{
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat))
    {
      return true;
    }
    else
    {
      return false;
    }
}

    function send_forget_mail2()
    {
      document.getElementById("div_forgetmail_result").innerHTML = "";
        var email = document.getElementById("customer_forget_email").value.trim();
        if (email.length === 0)
        {
            document.getElementById("email_address-error").style.display = "block";
        }
        else
        {   
            var email_check = ValidateEmail(email);
            if (email_check === true)
            {
                document.getElementById("email_address-error").style.display = "none";
                 require(['jquery'],function($)
                {
                    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

                    $(document).ready(function()
                    {
                            
                          $.post(link,
                          {
                            m: "forgottenmail",
                            email: email
                          },
                          function(data, status){
                              if (data)
                              {
                                    var json = JSON.parse(data);
                                    var stat = json.stat;
                                    if (stat == "ok")
                                    {
                                        document.getElementById("div_success").style.display = "block";
                                        document.getElementById("success_email").innerHTML = email;
                                    }
                                    else 
                                    {
                                        
                                        document.getElementById("div_success").style.display = "none";
                                        document.getElementById("success_email").innerHTML = "";
                                        var msg = json.msg;
                                        document.getElementById("div_forgetmail_result").innerHTML = msg;
                                     
                                    }
                              }
                            
                          });
                    });
                });    
                
            }
            else
            {
                document.getElementById("div_success").style.display = "none";
                document.getElementById("email_address-error").style.display = "block";
            }
            
        }
    }

function forget_mail(obj)
{
    var el = obj.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    
    
    if (document.getElementById("customer_forget_email"))
    {
        document.getElementById("customer_forget_email").value = "";
        
        
    }
    if (document.getElementById("div_success"))
    {
        document.getElementById("div_success").style.display = "none";
    } 
    var close_button = el.getElementsByClassName("action-close").item(0);
    close_button.click();
    
    
    document.getElementById("btn_customer_forgetmail_modal").click();
}
function forget_mail2(obj)
{
    document.getElementById("btn_customer_forgetmail_modal").click();
}
function create_an_account(obj)
{
    var el = obj.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    var close_button = el.getElementsByClassName("action-close").item(0);
    close_button.click();
    
    document.getElementById("btn_customer_register_modal").click();
}
function make_an_account(obj)
{
  document.getElementById("div_register_result").innerHTML = "";
    var err_count = 0;
    var email = document.getElementById("customer_register_order_email_adres").value.trim();
    var check_email = ValidateEmail(email);
    if (check_email === false)
    {
       document.getElementById("customer_register_order_email_adres_error").style.display = "block";
       err_count = err_count + 1;
    }
    else
    {
       document.getElementById("customer_register_order_email_adres_error").style.display = "none";
    }
    
    var firstname = document.getElementById("customer_register_firstname").value.trim();
    if (firstname.length === 0)
    {
      document.getElementById("customer_register_firstname_error").style.display = "block";
       err_count = err_count + 1;
    }
    else
    {
      document.getElementById("customer_register_firstname_error").style.display = "none";
    }
    
    var lastname = document.getElementById("customer_register_lastname").value.trim();
    if (lastname.length === 0)
    {
      document.getElementById("customer_register_lastname_error").style.display = "block";
       err_count = err_count + 1;
    }
    else
    {
      document.getElementById("customer_register_lastname_error").style.display = "none";
    }
    
    var telephone = document.getElementById("customer_register_telephone").value.trim();
    if (telephone.length === 0)
    {
      document.getElementById("customer_register_telephone_error").style.display = "block";
       err_count = err_count + 1;
    }
    else
    {
      document.getElementById("customer_register_telephone_error").style.display = "none";
    }
    
    
    var aggrement_checked = document.getElementById("chk_1").checked;
    if (aggrement_checked === false)
    {
      document.getElementById("chk_1_error").style.display = "block";
      err_count = err_count + 1;
    }
    else
    {
      document.getElementById("chk_1_error").style.display = "none";
    }
    
    if (err_count === 0)
    {
      var param_0 = document.getElementById("customer_register_firstname").value.trim();
      var param_1 = document.getElementById("customer_register_lastname").value.trim();
      var param_2 = document.getElementById("customer_register_telephone").value.trim();
      var param_3 = document.getElementById("customer_register_order_email_adres").value.trim();
      var param_4 = document.getElementById("customer_register_company").value.trim();
      var param_5 = document.getElementById("customer_register_invoice_email_adres").value.trim();
      var param_6 = document.getElementById("customer_register_kvk").value.trim();
      var param_7 = document.getElementById("customer_register_btw").value.trim();
      var param_8 = document.getElementById("customer_register_contact_person").value.trim();
      var param_9 = document.getElementById("customer_register_onderneming").value.trim();
      var param_10 = document.getElementById("customer_register_medewerkers").value.trim();
      var param_11 = document.getElementById("customer_register_website").value.trim();
      var param_12 = document.getElementById("customer_register_functie").value.trim();
      var param_13 = document.getElementById("customer_register_vraag").value.trim();
      
      var param_14 = "0";
      if (document.getElementById("chk_2").checked === true)
      {
        param_14 = "1";
      }
      
   
      jQuery.ajaxSetup(
              {
                cache: false
              });
              
      var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);
        
      jQuery.post(link,
      {
        m: "createanaccount",
        param0 : param_0,
        param1 : param_1,
        param2 : param_2,
        param3 : param_3,
        param4 : param_4,
        param5 : param_5,
        param6 : param_6,
        param7 : param_7,
        param8 : param_8,
        param9 : param_9,
        param10: param_10,
        param11: param_11,
        param12: param_12,
        param13: param_13,
        param14: param_14
        
      },
      function(data, status){
        if (data)
        {
          console.log(data);
          var json = JSON.parse(data);
          var stat = json.stat;
          
          if (stat == "ok")
          {
            document.getElementById("div_register_result").innerHTML = "klant is toegevoegd aan de bijbehorende website met succes";
            var email = json.email;
            var pass  = json.pass;
            
            document.getElementById("ajaxlogin-email").value = email;
            e = jQuery.Event('keyup');
            e.keyCode = 20; // enter
            jQuery('#ajaxlogin-email').trigger(e);
  
            document.getElementById("ajaxlogin-pass").value = pass;
            e = jQuery.Event('keyup');
            e.keyCode = 20; // enter
            jQuery('#ajaxlogin-pass').trigger(e);
            
            document.getElementById("ajaxlogin-send").click();
  




            setTimeout(function(){document.getElementById("btn_customer_register_modal").click()},2000);
          }
          if (stat == "fail")
          {
            var msg = json.msg;
            if (msg == "customer already exists")
            {
              document.getElementById("div_register_result").innerHTML = "Een klant met hetzelfde e-mailadres bestaat al op een bijbehorende website";
            }
            if (msg == "customer not created")
            {
              document.getElementById("div_register_result").innerHTML = "error";
            }
          }
          
        }
        
        
      });
      
      
      
      
     
      
    }
    
    
    
}

function update_lazyload_images() {
  var lazyload_images = document.getElementsByClassName("lazyload");
  for (var i = 0; i < lazyload_images.length; i++) {
    var active_image = lazyload_images[i];
    var active_image_src = active_image.getAttribute("data-src");
    console.log(i + "----" + active_image_src);
    active_image.className = "product-image-photo";
    active_image.src = active_image_src;
  }
}

function hide_loading() {
  setTimeout(function() {
    var loading_mask = document.getElementsByClassName("loading-mask");
    if (loading_mask) {
      loading_mask = loading_mask.item(0);
      var display = loading_mask.style.display;
      if (display == "block") {
        loading_mask.style.display = "none";
      }
    }
  }, 3000);
}

function uploadFile() {
  var cart_item = document.getElementById("mini-cart");
  if (cart_item) {
    var delete_item = cart_item.getElementsByClassName("delete").item(0);
    delete_item = delete_item.getAttribute("data-cart-item");

    var files = document.getElementById("file").files;

    if (files.length > 0) {

      var formData = new FormData();
      formData.append("file", files[0]);
      formData.append("item_id", delete_item);

      var xhttp = new XMLHttpRequest();

      // Set POST method and ajax file path
      
      
      
      xhttp.open("POST", location.origin + "/code/productionprocess/save_pakbon.php", true);

      // call on request changes state
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          var response = this.responseText;
          if (response) {
            var json = JSON.parse(response);
            var stat = json.stat;
            if (stat == "ok") {
              var loc = json.loc;
              document.getElementById("div_file_result").innerHTML = "File Uploaded";


            } else {
              document.getElementById("div_file_result").innerHTML = "There is a problem with file upload";
            }
          }



        }
      };

      // Send request with data
      xhttp.send(formData);

    } else {
      alert("Please select a file");
    }
  }



}

function isVisibleInViewport(elem) {
  var y = elem.offsetTop;
  var height = elem.offsetHeight;

  while (elem = elem.offsetParent)
    y += elem.offsetTop;

  var maxHeight = y + height;
  var isVisible = (y < (window.pageYOffset + window.innerHeight)) && (maxHeight >= window.pageYOffset);
  return isVisible;

}

function mouse_over(obj) {

  obj.style.backgroundColor = "red";
  console.log("11");
}

function customer_login2() {


  var signin_element = document.getElementsByClassName("trigger-ajax-login");
  
  if (document.getElementById("ajaxlogin-email"))
  {
        document.getElementById("ajaxlogin-email").value = "";
        document.getElementById("ajaxlogin-pass").value = "";    
      
  }
  
  
  
  
  
  
  
  
  
  if (signin_element.length > 0) {
    document.getElementsByClassName("trigger-ajax-login").item(0).click();
  } else {

  }


}

function customer_control() 
{
  var log_element = document.getElementsByClassName("authorization-link");
  var log_element_html = log_element.item(0).innerHTML;

  var login = 0;
  if (log_element_html.indexOf("Sign In") !== -1) {
    login = 0;
  } else {
    login = 1;
  }
  

  if (login == 1) 
  {
    var screen_width = window.innerWidth;
    
    if (screen_width >= 885)
    {
      document.getElementsByClassName("page_login").item(0).style.display = "block";
    }
    else
    {
      document.getElementsByClassName("page_loginmobile").item(0).style.display = "block";
    }
    



    var slider_element = document.getElementsByClassName("sm-imageslider");
    if (slider_element) {
      var no_logins = document.getElementsByClassName("home_login");
      for (var i = 0; i < no_logins.length; i++) {
        no_logins.item(i).style.position = "unset";
        no_logins.item(i).style.left = "0";
      }
     
    }

  }
  if (login == 0) 
  {
    var slider_element = document.getElementsByClassName("sm-imageslider");
    if (slider_element.length > 0) {

      var mainelement = document.getElementById("maincontent");
      var container_element = mainelement.getElementsByClassName("container").item(0);
      container_element.style.width = "100%";
      container_element.style.maxWidth = "1600px";

      var no_logins = document.getElementsByClassName("home_nologin");
      for (var i = 0; i < no_logins.length; i++) {
        no_logins.item(i).style.position = "unset";
        no_logins.item(i).style.left = "0";
      }
      
    }

  }




}

function show_cart() {
  document.getElementsByClassName("showcart").item(0).click();

  //document.getElementsByClassName("mage-dropdown-dialog").item(1).style.display = "block"


}


function getPos(el) {
  // yay readability
  for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {
    x: lx,
    y: ly
  };
}

window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  //console.log(scroll);

  update_lazyload_images();
  if (document.getElementById("card2_custom")) 
  {
    var card2_custom = document.getElementById("card2_custom");
    var pos = getPos(card2_custom);
    var height;
    
    if (document.getElementById("ui-datepicker-div"))
    {
      height = document.getElementById("ui-datepicker-div").style.height;
      if (height !== "0px") {
        var y = pos.y + 70;
        var x = pos.x;
  
        document.getElementById("ui-datepicker-div").style.top = y + "px";
        document.getElementById("ui-datepicker-div").style.left = x + "px";
      }
    }
  }





  var el = document.getElementById("logo_header_up");
  if (isVisibleInViewport(el)) {
    if (document.getElementById("checkout_side_bar")) {
      document.getElementById("checkout_side_bar").style.marginTop = "35px";
    }

    //console.log("visible");
    document.getElementById("hot-cat-wrapper").style.position = "absolute";
    document.getElementById("hot-cat-wrapper").style.top = "3px";
    document.getElementById("hot-cat-wrapper").style.width = "100%";
  } else {
    var snc = (scroll - 100);
    if (document.getElementById("checkout_side_bar")) {
      if (snc > 0) {
        document.getElementById("checkout_side_bar").style.marginTop = snc + "px";
      }

    }


    //console.log("not visible");
    document.getElementById("hot-cat-wrapper").style.position = "fixed";
    document.getElementById("hot-cat-wrapper").style.top = "3px";

    var gen = screen.width;

    if (gen >= 1600) {
      document.getElementById("hot-cat-wrapper").style.width = "1570px";
    } else {
      document.getElementById("hot-cat-wrapper").style.width = "calc(100% - 30px)";
    }

  }

  var div_left_sidebar = document.getElementById("div_left_sidebar");

  div_left_sidebar.classList.toggle("div_left_sidebar_fixed", scrollY > 100);

});

function opslaan() {
  var json = document.getElementById("inp_jsonstring").value.trim();
  var qty = document.getElementById("qty").value.trim();
  var reference = document.getElementById("usr").value.trim();
  var day = document.getElementById("inp_day").value.trim();
  if (reference.length == 0) {
    var message = "<span style='color:red'>You must enter reference to save this product</span>";
    document.getElementById("div_message").innerHTML = message;
  } else {
    const dat = {
      data: json,
      qty: qty,
      reference: reference,
      day: day,
      site: "vlaggenactie"
    };
    console.log(dat);


    var dat_str = JSON.stringify(dat);

    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

    
    
    jQuery.ajaxSetup(
              {
                cache: false
              });
              
    jQuery.post(link, {
        dat: dat_str,
        m: "savetomyproducten"
      },
      function(data, status) {
        document.getElementById("btn_modal_close").click();
        document.getElementById("usr").value = "";
        console.log(data);
      });



    document.getElementById("div_message").innerHTML = "";
  }
}

function logout()
{
  
  document.getElementsByClassName('authorization-link').item(0).getElementsByTagName('a').item(0).click();
}


function show_dv_right2(number) {

  var forbidden_place_holder = ["Aantal orgineel", "Productiedagen", "leverdatum", "Options", "Kniestuk", "Leuningdrager", "Koppelmof", "Stormfix Spanner", "Spanner met Spinhaak", "Lengte"];




  var html = "";
  var div_element = document.getElementById("dv_left");
  if (div_element) {

    var dd_s = div_element.getElementsByTagName("dd");
    var moved = false;


    var son_dd;
    for (var j = dd_s.length - 1; j > 0; j--) {
      var dd_style = dd_s[j].style.display;
      if (dd_style !== 'none') {
        var input_length = dd_s[j].getElementsByTagName("input").length;
        var textarea_length = dd_s[j].getElementsByTagName("textarea").length;
        var select_length = dd_s[j].getElementsByTagName("select").length;
        var dd_id = dd_s[j].id;
        var dd_id2 = dd_s[j].id;

        var dd_9999_element = document.getElementById("dd_9999");
        if (dd_9999_element) {
          if (document.getElementById("dd_9999").style.display === 'none') {
            son_dd = dd_id;
          } else {
            son_dd = "dd_9999";
          }
        }


        dd_id2 = dd_id2.replace("dd_", "select_");

        var sel_el_value = "";


        var sel_el = document.getElementById(dd_id2);
        if (sel_el) {
          if (sel_el.outerHTML.indexOf("<select") !== -1) {
            sel_el_value = sel_el.options[sel_el.selectedIndex].text;
          }
        }




        if (sel_el_value == 'Calculate') {


          son_dd = "div_product_quantity2";
        }

        break;
      }
    }

    var forbidden_dt = ["Options", "Aantal orgineel", "Productiedagen", "Verwachte leverdatum", "leverdatum", "Kniestuk", "Leuningdrager", "Koppelmof", "Stormfix Spanner", "Spanner met Spinhaak", "Lengte"];

    for (var i = 0; i < dd_s.length; i++) {
      var dd_style = dd_s[i].style.display;
      if (dd_style !== 'none') {
        var input_length = dd_s[i].getElementsByTagName("input").length;
        var textarea_length = dd_s[i].getElementsByTagName("textarea").length;
        var select_length = dd_s[i].getElementsByTagName("select").length;
        var dd_id = dd_s[i].id;


        dd_id = dd_id.replace("dd_", "");



        if (select_length > 0) {
          var selTag = dd_s[i].getElementsByTagName("select").item(0);
          var selText = selTag.options[selTag.selectedIndex].text;


          if ((selText.indexOf("-- Selecteer a.u.b. --") == -1) && (selText.indexOf("Go On") == -1)) {
            if (document.getElementById("title_" + dd_id)) {
              var sel_value = document.getElementById("title_" + dd_id).innerHTML;
              sel_value = sel_value.replace("Kies ", "");
              var dt_title = "";
              if (forbidden_dt.indexOf(sel_value) == -1) {
                dt_title = sel_value;
                if (sel_value !== "uit standaard formaten of voer zelf je formaat in (B x H cm)") {

                  html += "<dt id='dtt_" + dd_id + "'>" + sel_value + "</dt>";
                }



              }



              var sel_element = document.getElementById("title_" + dd_id);




              if (moved === false) {
                //   var hFix = jQuery(".dv_right").offset().top;
                son_dd = son_dd.replace("dd_", "");
                var topVal;

                if (son_dd == 'div_product_quantity2') {
                  topVal = jQuery("#div_product_quantity2").offset().top;
                  //   jQuery(".dv_right").animate({"top": topVal - 230}, 500);
                  //window.scroll(0, topVal - 230)
                } else {
                  var knm = "";
                  if (jQuery('#title_' + son_dd).length > 0) {
                    knm = '#title_' + son_dd;
                  } else {
                    knm = '#dd_' + son_dd
                  }

                }







                moved = true;



              }



            }

            if (selText !== 'Calculate' && dt_title !== 'uit standaard formaten of voer zelf je formaat in (B x H cm)') {
              if (selText.length > 0) {
                html += "<dd id='ddd_" + dd_id + "'>" + selText + "</dd>";
              }




            }



          }
        }

        if (input_length == 1) {
          var input_val = dd_s[i].getElementsByTagName("input").item(0).value;
          var input_val_id = dd_s[i].getElementsByTagName("input").item(0).id;


          input_val_id = input_val_id.replace("options_", "");
          input_val_id = input_val_id.replace("_text", "");


          var placeholder = dd_s[i].getElementsByTagName("input").item(0).placeholder;
          placeholder = placeholder.replace("Kies ", "");



          if (placeholder == undefined || placeholder == '' || placeholder.length == 0) {
            var placeholder = dd_s[i].getElementsByTagName("input").item(0).getAttribute("placeholderr");
            placeholder = placeholder.replace("Kies ", "");
          }



          if (input_val.length > 0 && placeholder.length > 0) {
            if (forbidden_place_holder.indexOf(placeholder) == -1) {
              if (html.indexOf("Geen") !== -1) {
                if (placeholder !== 'Aangegeven in bestand' && placeholder !== 'Boorgat rond (mm)' && placeholder !== 'Hartmaat (mm)') {
                  html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
                  html += "<dd id='ddinp_" + input_val_id + "'>" + input_val + "</dd>";
                }



              } else {
                html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
                html += "<dd id='ddinp_" + input_val_id + "'>" + input_val + "</dd>";
              }






            }
          }
        }



        if (input_length == 3) {

          var placeholder = dd_s[i].getElementsByTagName("input").item(1).getAttribute("placeholderr");
          if (placeholder !== null) {

            var input_val_id = dd_s[i].getElementsByTagName("input").item(1).id;
            input_val_id = input_val_id.replace("options_", "");
            input_val_id = input_val_id.replace("_text", "");

            placeholder = placeholder.replace("Kies ", "");
            input_val = dd_s[i].getElementsByTagName("input").item(1).value;

            if (input_val.length > 0 && placeholder.length > 0) {
              var dd_lower = lower_title(placeholder);

              if (placeholder !== 'Options') {



                if (html.indexOf("Geen") !== -1) {
                  if (placeholder !== 'Aangegeven in bestand' && placeholder !== 'Boorgat rond (mm)' && placeholder !== 'Hartmaat (mm)') {
                    html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
                    html += "<dd id='ddinp_" + input_val_id + "'>" + input_val + "</dd>";
                  }



                } else {
                  html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
                  html += "<dd id='ddinp_" + input_val_id + "'>" + input_val + "</dd>";
                }
              }

            }
          }
        }
        if (textarea_length == 1) {
          var input_val = dd_s[i].getElementsByTagName("textarea").item(0).value;
          var input_val_id = dd_s[i].getElementsByTagName("textarea").item(0).id;
          input_val_id = input_val_id.replace("options_", "");
          input_val_id = input_val_id.replace("_text", "");


          var placeholder = dd_s[i].getElementsByTagName("textarea").item(0).placeholder;
          placeholder = placeholder.replace("Kies ", "");

          input_val_arr = input_val.split('\n');
          var input_val_str = "";

          for (var k = 0; k < input_val_arr.length; k++) {
            input_val_str += input_val_arr[k] + "<br>";
          }

          input_val_str = input_val_str + "|";
          input_val_str = input_val_str.replace("<br>|", "");


          if (input_val_str.length > 0 && placeholder.length > 0) {
            if (forbidden_place_holder.indexOf(placeholder) == -1) {
              html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
              html += "<dd id='ddinp_" + input_val_id + "'>" + input_val_str + "</dd>";
            }
          }
        }
      }
    }

    var first_four = html.substring(0, 4);
    if (first_four == '<dd>') {

      //html = "<dt>&nbsp;</dt>" + html;

      var dd_knm = html.indexOf("</dd>");
      html = html.substring(dd_knm, html.length);


    }



    if (html.length > 0) {

      console.log(html);

      clear_aantal();
      if (screen.width < 992) {
        document.getElementById("div_free_bar_title").style.display = "block";
        document.getElementById("div_free_bar_0").innerHTML = html;
        document.getElementById("div_free_bar_0").style.display = "block";
        document.getElementById("div_free_bar").style.display = "block";

      } else {
        document.getElementById("div_right_bar_title").style.display = "block";
        document.getElementById("div_right_bar_0").innerHTML = html;
      }


    }

  }

}

function show_dv_right() {

  var forbidden_place_holder = ["Aantal orgineel", "Productiedagen", "leverdatum", "Options", "Kniestuk", "Leuningdrager", "Koppelmof", "Stormfix Spanner", "Spanner met Spinhaak", "Lengte"];

  var html = "";
  var dd_s = document.getElementsByTagName("dd");
  var moved = false;
  var screen_width = screen.width;

  if (screen_width >= 1280) {
    document.getElementById("dv_right").style.marginLeft = "900px";
  }
  var son_dd;
  for (var j = dd_s.length - 1; j > 0; j--) {
    var dd_style = dd_s[j].style.display;
    if (dd_style !== 'none') {
      var input_length = dd_s[j].getElementsByTagName("input").length;
      var select_length = dd_s[j].getElementsByTagName("select").length;
      var dd_id = dd_s[j].id;
      var dd_id2 = dd_s[j].id;

      if (document.getElementById("dd_9999").style.display === 'none') {
        son_dd = dd_id;
      } else {
        son_dd = "dd_9999";
      }

      dd_id2 = dd_id2.replace("dd_", "select_");

      var sel_el_value = "";


      var sel_el = document.getElementById(dd_id2);
      if (sel_el) {
        if (sel_el.outerHTML.indexOf("<select") !== -1) {
          sel_el_value = sel_el.options[sel_el.selectedIndex].text;
        }
      }




      if (sel_el_value == 'Calculate') {


        son_dd = "div_product_quantity2";
      }





      if (document.getElementById("div_product_quantity2").innerHTML.indexOf("<table") !== -1) {
        var product_type = document.getElementById("product_type").value;

        if (product_type !== 'spandoekframe') {
          document.getElementById("div_product_quantity2").innerHTML = "";
          document.getElementById("div_other_prices").innerHTML = "";
          document.getElementById("div_panel").innerHTML = "";

        }



      }

      break;
    }
  }

  var forbidden_dt = ["Options", "Aantal orgineel", "Productiedagen", "leverdatum", "Kniestuk", "Leuningdrager", "Koppelmof", "Stormfix Spanner", "Spanner met Spinhaak", "Lengte"];

  for (var i = 0; i < dd_s.length; i++) {
    var dd_style = dd_s[i].style.display;
    if (dd_style !== 'none') {
      var input_length = dd_s[i].getElementsByTagName("input").length;
      var textarea_length = dd_s[i].getElementsByTagName("textarea").length;
      var select_length = dd_s[i].getElementsByTagName("select").length;
      var dd_id = dd_s[i].id;


      dd_id = dd_id.replace("dd_", "");



      if (select_length > 0) {
        var selTag = dd_s[i].getElementsByTagName("select").item(0);
        var selText = selTag.options[selTag.selectedIndex].text;


        if ((selText.indexOf("-- Selecteer a.u.b. --") == -1) && (selText.indexOf("Go On") == -1)) {
          if (document.getElementById("title_" + dd_id)) {
            var sel_value = document.getElementById("title_" + dd_id).innerHTML;
            sel_value = sel_value.replace("Kies ", "");

            var dt_title = "";

            if (forbidden_dt.indexOf(sel_value) == -1) {
              dt_title = sel_value;

              if (sel_value !== 'uit standaard formaten of voer zelf je formaat in (B x H cm)') {
                html += "<dt id='dtt_" + dd_id + "'>" + sel_value + "</dt>";
              }




            }



            var sel_element = document.getElementById("title_" + dd_id);




            if (moved === false) {
              //   var hFix = jQuery(".dv_right").offset().top;
              son_dd = son_dd.replace("dd_", "");
              var topVal;

              if (son_dd == 'div_product_quantity2') {
                topVal = jQuery("#div_product_quantity2").offset().top;
                //   jQuery(".dv_right").animate({"top": topVal - 230}, 500);
                window.scroll(0, topVal - 230)
              } else {
                var knm = "";
                if (jQuery('#title_' + son_dd).length > 0) {
                  knm = '#title_' + son_dd;
                } else {
                  knm = '#dd_' + son_dd
                }

                if (knm !== '#dd_') {


                  if (jQuery(knm).offset()) {

                    var inp_start_value = document.getElementById("inp_start").value;
                    if (inp_start_value !== "0") {
                      topVal = jQuery(knm).offset().top;



                      var dv_left_element = document.getElementById("dv_left");
                      if (screen.width >= 320 && screen.width < 360) {
                        const anchor = document.createElement('a');
                        anchor.href = knm;
                        dv_left_element.appendChild(anchor);
                        anchor.click();
                        dv_left_element.removeChild(anchor);
                      }
                      if (screen.width >= 360 && screen.width < 375) {
                        const anchor = document.createElement('a');
                        anchor.href = knm;
                        dv_left_element.appendChild(anchor);
                        anchor.click();
                        dv_left_element.removeChild(anchor);
                      }
                      if (screen.width >= 375 && screen.width <= 414) {
                        const anchor = document.createElement('a');
                        anchor.href = knm;
                        dv_left_element.appendChild(anchor);
                        anchor.click();
                        dv_left_element.removeChild(anchor);
                      }
                      if (screen.width > 414 && screen.width <= 480) {
                        const anchor = document.createElement('a');
                        anchor.href = knm;
                        dv_left_element.appendChild(anchor);
                        anchor.click();
                        dv_left_element.removeChild(anchor);
                      }
                      if (screen.width > 480 && screen.width <= 600) {
                        const anchor = document.createElement('a');
                        anchor.href = knm;
                        dv_left_element.appendChild(anchor);
                        anchor.click();
                        dv_left_element.removeChild(anchor);
                      }
                      if (screen.width > 600 && screen.width <= 768) {
                        const anchor = document.createElement('a');
                        anchor.href = knm;
                        dv_left_element.appendChild(anchor);
                        anchor.click();
                        dv_left_element.removeChild(anchor);
                      }



                      if (screen.width >= 1280) {
                        window.scroll(0, topVal - 230)
                      }


                      if (screen.width >= 1176 && screen.width < 1280) {
                        window.scroll(0, topVal - 230)
                      }

                      if (screen.width >= 1152 && screen.width < 1176) {
                        window.scroll(0, topVal - 210)
                      }
                      if (screen.width >= 1024 && screen.width < 1152) {
                        window.scroll(0, topVal - 210)
                      }


                    }


                  }


                }



              }







              moved = true;



            }



          }
          if (selText !== 'Calculate' && dt_title !== 'uit standaard formaten of voer zelf je formaat in (B x H cm)') {
            if (selText.length > 0) {
              html += "<dd id='ddd_" + dd_id + "'>" + selText + "</dd>";
            }




          }



        }
      }

      if (input_length == 1) {
        var input_val = dd_s[i].getElementsByTagName("input").item(0).value;

        var placeholder = dd_s[i].getElementsByTagName("input").item(0).placeholder;


        if (placeholder == undefined || placeholder.length == 0) {
          placeholder = dd_s[i].getElementsByTagName("input").item(0).getAttribute("placeholderr");
        }
        var input_val_id = dd_s[i].getElementsByTagName("input").item(0).id;
        input_val_id = input_val_id.replace("options_", "");
        input_val_id = input_val_id.replace("_text", "");

        placeholder = placeholder.replace("Kies ", "");


        if (input_val.length > 0 && placeholder.length > 0) {
          var dd_lower = lower_title(placeholder);

          if (placeholder !== 'Options' && forbidden_dt.indexOf(placeholder) == -1) {
            html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
            html += "<dd id='ddinp_" + input_val_id + "'>" + input_val + "</dd>";
          }




        }

      }
      if (input_length == 3) {
        var placeholder = dd_s[i].getElementsByTagName("input").item(1).getAttribute("placeholderr");
        if (placeholder !== null) {
          var input_val_id = dd_s[i].getElementsByTagName("input").item(1).id;
          input_val_id = input_val_id.replace("options_", "");
          input_val_id = input_val_id.replace("_text", "");

          placeholder = placeholder.replace("Kies ", "");
          input_val = dd_s[i].getElementsByTagName("input").item(1).value;

          if (input_val.length > 0 && placeholder.length > 0) {
            var dd_lower = lower_title(placeholder);

            if (placeholder !== 'Options') {
              console.log("aaa1");
              console.log(html);
              console.log(placeholder);
              console.log(input_val);
              console.log("bbb1");
              if (html.indexOf("Geen") !== -1) {
                if (placeholder.indexOf("Aangegeven in bestand") !== -1 && placeholder.indexOf("Boorgat rond (mm)") !== -1 && placeholder.indexOf("Hartmaat (mm)" !== -1)) {
                  html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
                  html += "<dd id='ddinp_" + input_val_id + "'>" + input_val + "</dd>";
                }
              } else {


                html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
                html += "<dd id='ddinp_" + input_val_id + "'>" + input_val + "</dd>";




              }





            }

          }
        }
      }


      if (textarea_length == 1) {
        var input_val = dd_s[i].getElementsByTagName("textarea").item(0).value;
        var input_val_id = dd_s[i].getElementsByTagName("textarea").item(0).id;
        input_val_id = input_val_id.replace("options_", "");
        input_val_id = input_val_id.replace("_text", "");



        var placeholder = dd_s[i].getElementsByTagName("textarea").item(0).placeholder;
        placeholder = placeholder.replace("Kies ", "");

        input_val_arr = input_val.split('\n');
        var input_val_str = "";

        for (var k = 0; k < input_val_arr.length; k++) {
          input_val_str += input_val_arr[k] + "<br>";
        }
        input_val_str = input_val_str + "|";
        input_val_str = input_val_str.replace("<br>|", "");


        if (input_val_str.length > 0 && placeholder.length > 0) {
          if (forbidden_place_holder.indexOf(placeholder) == -1) {
            console.log("aaa");
            console.log(input_val_str);
            console.log("bbb");

            html += "<dt id='dtinp_" + input_val_id + "'>" + placeholder + "</dt>";
            html += "<dd id='ddinp_" + input_val_id + "'>" + input_val_str + "</dd>";

            alert(html);
          }
        }
      }




    }
  }



  var first_four = html.substring(0, 4);
  if (first_four == '<dd>') {

    //html = "<dt>&nbsp;</dt>" + html;

    var dd_knm = html.indexOf("</dd>");
    html = html.substring(dd_knm, html.length);


  }


  var html2 = "<dt></dt><dd></dd>" + html;




  if (html.length > 0) {

    if (screen.width > 992) {
      document.getElementById("div_right_bar_1").style.display = "none";
      document.getElementById("div_right_bar_2").style.display = "none";
      document.getElementById("div_right_bar_title").style.display = "block";
      document.getElementById("div_right_bar_0").innerHTML = html;





    } else {
      document.getElementById("div_free_bar_1").style.display = "none";
      document.getElementById("div_free_bar_2").style.display = "none";
      document.getElementById("div_free_bar_title").style.display = "block";
      document.getElementById("div_free_bar_0").innerHTML = html;
      document.getElementById("div_free_bar_0").style.display = "block";
      document.getElementById("div_free_bar").style.display = "block";
    }







    set_acs_values();

  }

  hide_option_for_spandoekframe();




  //document.getElementById("pHCont_a").innerHTML = html;

}

function get_selected_data() {
  var arr = "";
  var pname = document.getElementById("inp_pname").value;

  arr += "pname=" + pname;
  for (var i = 0; i < 50; i++) {
    var content_id = "div_content_" + i;
    var label_id   = "div_label_" + i;


    var label_display = "";
    if (document.getElementById(label_id))
    {
      label_display = document.getElementById(label_id).style.display;
    }
   

    
    if (document.getElementById(content_id) && label_display == "block") {
      var cards = document.getElementById(content_id).getElementsByClassName("card");
      if (cards.length == 0) {
        if (document.getElementById("inp_width")) {
          var width = document.getElementById("inp_width").value;


          arr += "&width=" + width;


        }
        if (document.getElementById("inp_height")) {

          var height = document.getElementById("inp_height").value;



          arr += "&height=" + height;


        }
        if (document.getElementById("inp_amount")) {

          var amount = document.getElementById("inp_amount").value;


          arr += "&amount=" + amount;

        }



      } else {
        var selected_item = document.getElementById(content_id).getElementsByClassName("selected").item(0);
        var button_count = selected_item.getElementsByTagName("button").length;
        if (button_count == 0) {
          var onclick_str = selected_item.getAttribute("onclick");
          var splitt = onclick_str.split(",");
          var selected_id = splitt[2];
          arr += "&" + selected_id + "=";
        } else {
          var button_ = selected_item.getElementsByTagName("button").item(0);
          var onclick_str = button_.getAttribute("onclick");
          var splitt = onclick_str.split(",");
          var selected_id = splitt[3];

          var val = selected_item.getElementsByTagName("input").item(0).value.trim();
          arr += "&" + selected_id + "=" + val;
        }






      }
    }
  }

  var accessories_element = document.getElementById("div_product_accessories");
  if (accessories_element.innerHTML.length > 0) {
    var selected_items = accessories_element.getElementsByClassName("selected");
    if (selected_items.length > 0) {
      for (var i = 0; i < selected_items.length; i++) {
        var selected_item = selected_items.item(i);
        var input_item = selected_item.getElementsByTagName("input");
        if (input_item.length > 0) {
          var input_value = input_item.item(0).value.trim();
          var onclick_str = selected_item.getElementsByClassName("div_acs_top").item(0).getAttribute("onclick");

          var splitt = onclick_str.split(",");
          var selected_id = splitt[2];

          arr += "&" + selected_id + "=" + input_value;

        } else {

        }
      }
    }
  }

  var inp_ptype2 = document.getElementById("inp_ptype2").value;
    if (inp_ptype2 == "Custom Flag")
    {
        var selected_formaat = document.getElementsByClassName("div_size_item_selected").item(0).innerHTML;
        arr += "&formaat=" + selected_formaat;
    }
    
    if (inp_ptype2 == "Tuindoek")
    {
        var selected_formaat = document.getElementsByClassName("div_size_item_selected").item(0).innerHTML;
        arr += "&formaat=" + selected_formaat;
    }

  var qty = document.getElementById("qty").value;
  arr += "&qty=" + qty;
  var day = document.getElementById("inp_day").value;
  arr += "&day=" + day;

  arr += "&leverdatum=" + document.getElementById("inp_leverdatum").value;

  console.log(arr);

  return arr;
}

function size_control(optionsarray, id1, id2, last) {
  var width = document.getElementById("inp_width");
  var width_min = 0;
  var width_max = 0;

  var size_error = 0;


  if (width) {
    width_min = parseFloat(width.getAttribute("min"));
    width_max = parseFloat(width.getAttribute("max"));
  }


  var height = document.getElementById("inp_height");
  var height_min = 0;
  var height_max = 0;

  if (height) {
    height_min = parseFloat(height.getAttribute("min"));
    height_max = parseFloat(height.getAttribute("max"));
  }



  var amount = document.getElementById("inp_amount");

  var text = "";
  var err = 0;
  if (width) {
    var width_value = width.value.trim();
    if (width_value.length == 0) {

      err += 1;

      alert("Kies een breedte");

    } else {
      width_value = parseFloat(width_value);
      if (width_min > 0 && width_max > 0 && (width_value < width_min || width_value > width_max)) {
        err += 1;
        size_error += 1;
        //alert("width value must be between " + width_min + " and " + width_max);
      } else {
        text += width_value + "cm ";
      }

    }

  }
  
  if (height) {
    var height_value = height.value.trim();
    if (height_value.length == 0) {

      err += 1;
      alert("Kies een hoogte");


    } else {
      height_value = parseFloat(height_value);
      if (height_min > 0 && height_max > 0 && (height_value < height_min || height_value > height_max)) {
        err += 1;
        size_error += 1;

        //alert("height value must be between " + height_min + " and " + height_max);


      } else {
        text += " X " + height_value + "cm ";
      }


    }
  }
if (size_error > 0)
{
   var error_txt = "Kies een breedte tussen " + width_min + " en " + width_max + " cm en een hoogte tussen " + height_min + " en " + height_max + " cm";
   alert(error_txt);
  
}

  if (amount) {
    var amount_value = amount.value.trim();
    if (amount_value.length > 0) {
      text += " Aantal : " + amount_value;

    }
  }

  if (err == 0) {

    document.getElementById("a_text_0").innerText = text;

    get_opt(optionsarray, id1, id2, last, '', 0);
    show_down(0);
  }

}

function remove_label(ddd_id) {


  var element1 = document.getElementById("ddinp_" + ddd_id);
  if (element1) {

    element1.outerHTML = "";
    // element1.remove;
  }
  var element2 = document.getElementById("dtinp_" + ddd_id);
  if (element2) {
    element2.outerHTML = "";
    //element2.remove;
  }
}
var optionsarray = [];

//for sn
window.addEventListener("load", function() 
{
  if (document.getElementById("inp_attributeset_name"))
  {
        var inp_attributeset_name = document.getElementById("inp_attributeset_name").value;
        if (inp_attributeset_name == "Printable")
        {
          

          var ptype2 = document.getElementById("inp_ptype2").value;
                
          if (ptype2 == "Custom Flag")
          {
            get_opt_custom_flag();
          }
          else if(ptype2 == "Tuindoek")
          {
              get_opt_tuindoek();
          }
          else
          {
            get_opt(optionsarray, 0, 0, 0, 0, 0);
          } 
  }
        if (inp_attributeset_name == "Accessories")
        {
          
          document.getElementById("div_qty_area").style.display = "block";
          document.getElementById("div_button_area").style.display = "block";
          document.getElementById("product_price").style.display = "block";
          
          var product_id = document.getElementById("inp_pid").value.trim();
          var customer_id = document.getElementById("inp_customerid").value.trim();
          
          var rnd = makeid(20);
         

          var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


          const xhttp = new XMLHttpRequest();
          xhttp.onload = function() 
          {
            var data = this.responseText;
            
            if (data && IsJsonString(data) == true) 
            {
              var json = JSON.parse(data);
              var stat = json.status;
              if (stat == "ok")
              {
                var price = json.price;
                var price_element = document.getElementById("product_price");
                price_element.innerHTML = "€ " + price;
              }
            } 
      
      
          }
          xhttp.open("POST", link);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send("m=getaccessoryprice&site=vlaggenactie&pid=" + product_id + "&cid=" + customer_id);
    }
    if (inp_attributeset_name == "Default")
    {
        document.getElementById("div_qty_area").style.display = "block";
        document.getElementById("div_button_area").style.display = "block";
        document.getElementById("product_price").style.display = "block";
          
        var product_id = document.getElementById("inp_pid").value.trim();
        var customer_id = document.getElementById("inp_customerid").value.trim();
        var rnd = makeid(20);
         
        var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() 
        {
            var data = this.responseText;
            
            if (data && IsJsonString(data) == true) 
            {
              var json = JSON.parse(data);
              var stat = json.status;
              if (stat == "ok")
              {
                var price = json.price;
                var price_element = document.getElementById("product_price");
                price_element.innerHTML = "€ " + price;
              }
            } 
      
      
          }
          xhttp.open("POST", link);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send("m=getdefaultprice&site=vlaggenactie&pid=" + product_id + "&cid=" + customer_id);
    }
}

}, false);



/*window.addEventListener("load", function() 
{
  if (document.getElementById("inp_attributeset_name"))
  {
        var site_type = document.getElementById("inp_site_type").value;
        
        var inp_attributeset_name = document.getElementById("inp_attributeset_name").value;
        if (inp_attributeset_name == "Printable")
        {
         

          var ptype2 = document.getElementById("inp_ptype2").value;
          
          var inp_customerid = document.getElementById("inp_customerid").value;
          
          if (inp_customerid.length > 0 || site_type == "perakende")
          {
              document.getElementById("div_right").style.display = "block";
              
              if (site_type == "toptan")
              {
                if (document.getElementById("div_login_required"))
                {
                    document.getElementById("div_login_required").style.display = "none";
                }
              }
              
              
              
              
              if (ptype2 == "Custom Flag")
              {
                get_opt_custom_flag();
              }
              else
              {
                get_opt(optionsarray, 0, 0, 0, 0, 0);
              } 
          }
          else
          {
              document.getElementById("div_right").style.display = "none";
              if (site_type == "toptan")
              {
                if (document.getElementById("div_login_required"))
                {
                    document.getElementById("div_login_required").style.display = "block";
                }    
              }
          }
     }
         var inp_customerid = document.getElementById("inp_customerid").value;
          
        if (inp_customerid.length > 0)
        {
            document.getElementById("div_right").style.display = "block";
            
            if (site_type == "toptan")
            {
                if (document.getElementById("div_login_required"))
                {
                    document.getElementById("div_login_required").style.display = "none";
                }
            }
            
            if (inp_attributeset_name == "Accessories")
            {
              
              document.getElementById("div_qty_area").style.display = "block";
              document.getElementById("div_button_area").style.display = "block";
              document.getElementById("product_price").style.display = "block";
              
              var product_id = document.getElementById("inp_pid").value.trim();
              var customer_id = document.getElementById("inp_customerid").value.trim();
              
              var rnd = makeid(20);
             
    
              var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);
    
    
              const xhttp = new XMLHttpRequest();
              xhttp.onload = function() 
              {
                var data = this.responseText;
                
                if (data && IsJsonString(data) == true) 
                {
                  var json = JSON.parse(data);
                  var stat = json.status;
                  if (stat == "ok")
                  {
                    var price = json.price;
                    var price_element = document.getElementById("product_price");
                    price_element.innerHTML = "€ " + price;
                  }
                } 
          
          
              }
              xhttp.open("POST", link);
              xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              xhttp.send("m=getaccessoryprice&site=vlaggenactie&pid=" + product_id + "&cid=" + customer_id);
            } 
        }
        else
        {
            if (site_type == "toptan")
            {
                document.getElementById("div_right").style.display = "none";
                document.getElementById("div_login_required").style.display = "block";
                
                if (document.getElementById("div_button_area"))
                {
                    document.getElementById("div_button_area").style.display = "none";
                }
                if (document.getElementById("div_qty_area"))
                {
                    document.getElementById("div_qty_area").style.display = "none";
                }
                
                if (document.getElementById("product_price"))
                {
                    document.getElementById("product_price").style.display = "none";
                }
            }
            
        }
}

}, false);*/




function remove_divs(id) {
  id = parseInt(id);
  var divs = document.getElementById("div_product_options").getElementsByTagName("div");


  for (var i = id; i < 50; i++) {
    var label_id = "div_label_" + i;
    var content_id = "div_content_" + i;

    if (document.getElementById(label_id)) {
      //jQuery("#" + label_id).remove();
      //jQuery("#" + label_id).css("display","none");
      document.getElementById(label_id).style.display = "none";
      
    }
    if (document.getElementById(content_id)) {
      //jQuery("#" + content_id).remove();
      
      //jQuery("#" + content_id).css("display","none");
      document.getElementById(content_id).style.display = "none";
    }

  }

}

function get_other_prices2(qty, price) {
  console.log(received_data2);
  var prices = received_data2.prices;
  var day_definition = received_data2.day_definition;

  var output = [];
  for (var i = 0; i < prices.length; i++) {
    var adet = prices[i].adet;
    if (adet == qty) {
      console.log(prices[i]);
      var num = 0;
      var keys = Object.keys(prices[i]);
      console.log(keys);

      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        if (key.indexOf("price") !== -1) {
          var selected_day = parseInt(key.replace("price_", ""));
          var new_price = prices[i][key];
          var diff = new_price - price;

          for (k = 0; k < day_definition.length; k++) {
            var which_day = parseInt(day_definition[k].which_day);


            if (which_day == selected_day) {
              console.log("selected:" + selected_day);
              console.log("which:" + which_day);
              console.log(day_definition[k]);

              var i_day = day_definition[k].day;
              var i_monthname = day_definition[k].month_name;
              var i_dayname = day_definition[k].day_name;

              var new_array = [];
              new_array["day"] = i_day;
              new_array["month_name"] = i_monthname;
              new_array["day_name"] = i_dayname;
              new_array["diff"] = diff;
              output.push(new_array);

            }
          }



        }


      }


    }
  }


  var html = "<h5 style='color: #f57f28; line-height: 29px;font-size: 12px;font-weight:bold'>Afhaal - en bezorgdatums</h5>";
  html += "<table id='table_other_prices' class='table table-hover table-bordered'>";
  html += "<tbody><tr style='line-height: 16px;'><th style='font-weight: normal;'><b>Datum</b></th><th style='font-weight: normal; text-align: right;'><b>Toeslag</b></th></tr>";


  for (var l = 0; l < output.length; l++) {
    var out = output[l];
    var o_day = out.day;
    var o_month_name = out.month_name;
    var o_day_name = out.day_name;
    var diff = out.diff;
    diff = parseFloat(diff).toFixed(2);

    if (o_month_name == "oktober") {
      o_month_name = "okt";
    }

    if (o_month_name == "januari") {
      o_month_name = "jan";
    }

    if (o_month_name == "februari") {
      o_month_name = "febr";
    }

    if (o_month_name == "maart") {
      o_month_name = "mrt";
    }

    if (o_month_name == "april") {
      o_month_name = "apr";
    }

    if (o_month_name == "mei") {
      o_month_name = "mei";
    }

    if (o_month_name == "juni") {
      o_month_name = "juni";
    }

    if (o_month_name == "juli") {
      o_month_name = "juli";
    }

    if (o_month_name == "augustus") {
      o_month_name = "aug";
    }

    if (o_month_name == "september") {
      o_month_name = "sep";
    }

    if (o_month_name == "november") {
      o_month_name = "nov";
    }

    if (o_month_name == "december") {
      o_month_name = "dec";
    }





    if (diff > 0) {
      //html += "<tr><td><div><div  class='date_square'><a class='date_square_a'>"  + o_day +  "</a><a class='date_square_a2'>" + o_month_name + "</a></div><div class='date_square2'><a>" + o_day_name + "</a></div></td><td style='width:100px'><a class='date_square_diff'>€ " + diff + "</a></td></tr>";
      html += `<tr  onclick="show_product_options()">
                           <th class="d-flex align-items-center" style="font-weight: normal;">
                                    <div class="text-center" style="width: 25px; border-right: 1px solid #dee2e6; line-height: 12px">
                                        <b>` + o_day + ` ` + o_month_name + `</b>
                                    </div> 
                                    <span class="pl-3">` + o_day_name + `</span></th>
                            <th style="padding-top: 10px; font-weight: normal; text-align: right;">
                               € ` + diff + ` excl.btw</th>
                        </tr>`;
    } else {
      //html += "<tr><td><div><div  class='date_square'><a class='date_square_a'>"  + o_day +  "</a><a class='date_square_a2'>" + o_month_name + "</a></div><div class='date_square2'><a>" + o_day_name + "</a></div></td><td style='width:100px'><a class='date_square_diff'>Geen Toeslag</a></td></tr>";
      html += `<tr  onclick="show_product_options()">
                           <th class="d-flex align-items-center" style="font-weight: normal;">
                                    <div class="text-center" style="width: 25px; border-right: 1px solid #dee2e6; line-height: 12px">
                                        <b>` + o_day + ` ` + o_month_name + `</b>
                                    </div> 
                                    <span class="pl-3">` + o_day_name + `</span></th>
                            <th style="padding-top: 10px; font-weight: normal; text-align: right;">Geen Toeslag</th>
                        </tr>`;


    }
  }




  html += "</tbody></table>";

  html += "<a style='display:block;margin-top:-5px;line-height:11px'>Kies de gewenste bezorgdag tijdens het afronden van de bestelling. Door producten te combineren bespaar je op verzendkosten en bij hogere afname kom je in aanmerking voor staffelkorting. Deze kortingen worden verrekend in je winkelwagen.</a>";

  html += "</div>";

  document.getElementById("div_other_prices").innerHTML = html;

  var html3 = "<table>";
  html3 += "<tbody>";

  var afmeting = 0;

  var width_element = document.getElementById("inp_width");
  if (width_element) {
    var width_value = width_element.value.trim();
    if (width_value.length > 0) {
      afmeting = 1;
      html3 += "<tr><td class='table_left' style='border:none !important;padding:0 !important'><a style='color: #f57f28; font-weight: bold'>Breedte</a></td><td class='table_left' style='border:none !important;padding:0 !important'><a>" + width_value + "cm</a></td></tr>";
    }
  }
  var height_element = document.getElementById("inp_height");
  if (height_element) {
    var height_value = height_element.value.trim();
    if (height_value.length > 0) {
      afmeting = 1;
      html3 += "<tr><td class='table_left'  style='border:none !important;padding:0 !important'><a>Hoogte</a></td><td class='table_left' style='border:none !important;padding:0 !important'><a>" + height_value + "cm</a></td></tr>";

    }
  }
  var amount_element = document.getElementById("inp_amount");
   if (amount_element) {
    var amount_value = amount_element.value.trim();
    if (amount_value.length > 0) {
      afmeting = 1;
      //html3 += "<tr><td class='table_left'  style='border:none !important;padding:0 !important'><a>Amount</a></td><td class='table_left' style='border:none !important;padding:0 !important'><a>" + amount_value + "</a></td></tr>";

    }
  }
  
  
  
  if (afmeting > 0) {
    for (var j = 1; j < 40; j++) {
      var title_element = document.getElementById("a_text2_" + j);
      if (title_element) {
        var title_element_value = title_element.innerText;
        var value_element = document.getElementById("a_text_" + j);
        var value_element_value = value_element.innerText;

        html3 += "<tr><td class='table_left'  style='border:none !important;padding:0 !important'><a>" + title_element_value + "</a></td><td class='table_left' style='border:none !important;padding:0 !important'><a>" + value_element_value + "</a></td></tr>";
      }

    }
  }



  html3 += "</tbody>";
  html3 += "</table>";



  var html2 = "<div style='display:none' id='product_options'>";


  html2 += "<table class='table' >";
  html2 += "<thead><th><span>Product</span></th><th></th><th><span>Aantal</span></th></thead>";
  html2 += "<tbody>";
  html2 += "<tr>";
  var product_img_src = "";
  var product_img = document.getElementsByClassName("fotorama__img");
  if (product_img) {
    product_img_src = product_img.item(0).src;
  }
  html2 += "<td class='last_img_div' style='border:none !important;'><div><img src='" + product_img_src + "' class='last_img' /></div></td>";








  html2 += "<td style='border:none !important'>" + html3 + "</td>";
  var selected_qty = document.getElementById("qty").value.trim();

  html2 += "<td class='last_img_div2' style='border:none !important'><span>" + selected_qty + "</span</td>";
  html2 += "</tr>";

  
  var accessories_div = document.getElementById("div_product_accessories");
  if (accessories_div)
  {
    var selected_acs = accessories_div.getElementsByClassName("selected");
    if (selected_acs.length > 0)
    {
      for (var m = 0; m < selected_acs.length;m++)
      {
          var div_id = selected_acs.item(m).getAttribute("id");
          if (div_id !== "div_acs_remove")
          {
              var acs_image = selected_acs.item(m).getElementsByTagName("img").item(0).getAttribute("src");
              var acs_qty = selected_acs.item(m).getElementsByClassName("div_asc_qty").item(0).getElementsByTagName("input").item(0).value.trim();
              var acs_name = selected_acs.item(m).getElementsByClassName("card-title").item(1).textContent;
              
              var acs_image_area = "<img src='" + acs_image + "' class='last_img' />";
              
              acs_qty = parseInt(acs_qty);
              if (acs_qty > 0)
              {
                html2 += "<tr style='border-top: 1px solid #dee2e6;line-height:50px'><td>" + acs_image_area + "</td><td><a>" + acs_name + "</a></td><td><a>" + acs_qty + "</a></td></tr>";
              }
              
              
          }
          
      }
    }
  }












  var selected_total = document.getElementsByClassName("selected_cell").item(1);
  selected_total = selected_total.getAttribute("total");
  selected_total = Math.round(selected_total  * 100) / 100;

  html2 += "<tr style='border-top: 1px solid #dee2e6'><td></td><td style='color: #f57f28; font-weight: bold; padding: 10px 0 10px 10px;'><a>Totaal excl. btw</a><a style='padding-left:45px'>€ " + selected_total + "</a></td><td></td></tr>";


  var link = window.location.origin;
  html2 += "<tr style='border-top: 1px solid #dee2e6; padding: 10px 0;'><td></td><td><a>Verzendkosten (vanaf)</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id='a_shipping_fee'><img style='width:30px' src='" + link + "/pub/media/materialprice/media/pattern/loading.gif' /></a></td><td></td></tr>";

  html2 += "</tbody>";
  html2 += "</table>";
  html2 += "</div>";

  html2 += `<div class="row no-gutters" style="display:none" id="div_product_buttons">`;


  html2 += `<div style="width:100%">
              <button onclick="add_to_cart()" class="button btn-info btn-lg btn-block button--fw _has-icon" style="width:100%; background-color: #f60">
                <div id="btn_click_div1" style="display: block; text-transform: none; font-weight:bold;>
                    <span class="text-white"><img src="` + link + `/pub/media/icon/cart.svg" width="16" style="margin: -5px 0 0 0;"><a style="color:#fff !important;margin-left:5px">Toevoegen aan winkelwagen</a></div> 
                    <div id="btn_click_div2" style="display: none;"><img style="width:30px" src="` + link + `/pub/media/materialprice/media/pattern/loading.gif"></div>
                </button>
                
                
                </div>`;

var customer_message = document.getElementById("cms_customer_message").value;  
    html2 += `<div id="div_customer_message">` + customer_message + `</div>`;



  html2 += `</div>`;

  var customer_id = document.getElementById("inp_customerid").value.trim();
  if (customer_id.length > 0) {
    html2 += `<div style='width:100%;text-align:center'>
                        <a style='cursor:pointer;color:blue;text-decoration:underline' onclick='save_to_my_producten()'>Samestelling Opslaan</a>
              </div>`;
  }



  document.getElementById("div_panel").innerHTML = html2;
  document.getElementById("btn_show_options").style.display = "none";
  document.getElementById("div_panel").style.display = "none";
  document.getElementById("product_options").style.display = "none";
  document.getElementById("div_product_buttons").style.display = "none";

}

function gocart() {
  //var link = window.location.origin + "/checkout/cart/#shipping";
  //window.location.replace(link);

  setTimeout(function() {
    document.getElementById("action_showcart").click()
  }, 200);

}

function show_product_options() {
  document.getElementById("div_panel").style.display = "block";
  document.getElementById("product_options").style.display = "block";
  document.getElementById("div_product_buttons").style.display = "flex";


}

function add_to_cart() {
  document.getElementById('product-addtocart-button').click();
  
  if (document.getElementById("btn_click_div1"))
  {
    document.getElementById("btn_click_div1").style.display = "none";
  }
  if (document.getElementById("btn_click_div2"))
  {
    document.getElementById("btn_click_div2").style.display = "block";
  }
  
  if (document.getElementById("btn_click_div10"))
  {
    document.getElementById("btn_click_div10").style.display = "none";
  }
  if (document.getElementById("btn_click_div20"))
  {
    document.getElementById("btn_click_div20").style.display = "block";
  }
  if (document.getElementById("btn_click_div11"))
  {
    document.getElementById("btn_click_div11").style.display = "none";
  }
  if (document.getElementById("btn_click_div21"))
  {
    document.getElementById("btn_click_div21").style.display = "block";
  }
  
}



function get_other_prices(qty, price) {
  console.log(received_data);
  var prices = received_data.prices;
  var day_definition = received_data.day_definition;

  var output = [];
  for (var i = 0; i < prices.length; i++) {
    var adet = prices[i].adet;
    if (adet == qty) {
      console.log(prices[i]);
      var num = 0;
      var keys = Object.keys(prices[i]);
      console.log(keys);

      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        if (key.indexOf("price") !== -1) {
          var selected_day = parseInt(key.replace("price_", ""));
          var new_price = prices[i][key];
          var diff = new_price - price;

          for (k = 0; k < day_definition.length; k++) {
            var which_day = parseInt(day_definition[k].which_day);


            if (which_day == selected_day) {
              console.log("selected:" + selected_day);
              console.log("which:" + which_day);
              console.log(day_definition[k]);

              var i_day = day_definition[k].day;
              var i_monthname = day_definition[k].month_name;
              var i_dayname = day_definition[k].day_name;

              var new_array = [];
              new_array["day"] = i_day;
              new_array["month_name"] = i_monthname;
              new_array["day_name"] = i_dayname;
              new_array["diff"] = diff;
              output.push(new_array);

            }
          }



        }


      }


    }
  }


  var html = "<h5 style='color: #f57f28; line-height: 29px;font-size: 12px;font-weight:bold'>Afhaal - en bezorgdatums</h5>";
  html += "<table id='table_other_prices' class='table table-hover table-bordered'>";
  html += "<tbody><tr style='line-height: 16px;'><td style='font-weight: normal;'><b>Datum</b></td><td style='font-weight: normal; text-align: right;'><b>Toeslag</b></td></tr>";

  for (var l = 0; l < output.length; l++) {
    var out = output[l];
    var o_day = out.day;
    var o_month_name = out.month_name;
    var o_day_name = out.day_name;
    var diff = out.diff;
    diff = parseFloat(diff).toFixed(2);

    if (o_month_name == "oktober") {
      o_month_name = "okt";
    }

    if (o_month_name == "januari") {
      o_month_name = "jan";
    }

    if (o_month_name == "februari") {
      o_month_name = "febr";
    }

    if (o_month_name == "maart") {
      o_month_name = "mrt";
    }

    if (o_month_name == "april") {
      o_month_name = "apr";
    }

    if (o_month_name == "mei") {
      o_month_name = "mei";
    }

    if (o_month_name == "juni") {
      o_month_name = "juni";
    }

    if (o_month_name == "juli") {
      o_month_name = "juli";
    }

    if (o_month_name == "augustus") {
      o_month_name = "aug";
    }

    if (o_month_name == "september") {
      o_month_name = "sep";
    }

    if (o_month_name == "november") {
      o_month_name = "nov";
    }

    if (o_month_name == "december") {
      o_month_name = "dec";
    }





    if (diff > 0) {
      //html += "<tr><td><div><div  class='date_square'><a class='date_square_a'>"  + o_day +  "</a><a class='date_square_a2'>" + o_month_name + "</a></div><div class='date_square2'><a>" + o_day_name + "</a></div></td><td style='width:100px'><a class='date_square_diff'>€ " + diff + "</a></td></tr>";
      html += `<tr onclick="show_product_options()">
                           <th class="d-flex align-items-center" style="font-weight: normal;">
                                    <div class="text-center" style="width: 25px; border-right: 1px solid #dee2e6; line-height: 12px">
                                        <b>` + o_day + ` ` + o_month_name + `</b>
                                    </div> 
                                    <span class="pl-3">` + o_day_name + `</span></th>
                            <th style="padding-top: 10px; font-weight: normal; text-align: right;">
                               € ` + diff + ` excl.btw</th>
                        </tr>`;
    } else {
      //html += "<tr><td><div><div  class='date_square'><a class='date_square_a'>"  + o_day +  "</a><a class='date_square_a2'>" + o_month_name + "</a></div><div class='date_square2'><a>" + o_day_name + "</a></div></td><td style='width:100px'><a class='date_square_diff'>Geen Toeslag</a></td></tr>";
      html += `<tr onclick="show_product_options()">
                           <th class="d-flex align-items-center" style="font-weight: normal;">
                                    <div class="text-center" style="width: 25px; border-right: 1px solid #dee2e6; line-height: 12px">
                                        <b>` + o_day + ` ` + o_month_name + `</b>
                                    </div> 
                                    <span class="pl-3">` + o_day_name + `</span></th>
                            <th style="padding-top: 10px; font-weight: normal; text-align: right;">Geen Toeslag</th>
                        </tr>`;


    }
  }




  html += "</tbody></table>";

  html += "<a style='display:block;line-height:11px;margin-top:-5px'>Kies de gewenste bezorgdag tijdens het afronden van de bestelling. Door producten te combineren bespaar je op verzendkosten en bij hogere afname kom je in aanmerking voor staffelkorting. Deze kortingen worden verrekend in je winkelwagen.</a>";

  html += "</div>";

  document.getElementById("div_other_prices").innerHTML = html;

  var html3 = "<table>";
  html3 += "<tbody>";

  var afmeting = 0;

  var width_element = document.getElementById("inp_width");
  if (width_element) {
    var width_value = width_element.value.trim();
    if (width_value.length > 0) {
      afmeting = 1;
      html3 += "<tr><td class='table_left' style='border:none !important;padding:0'><a style='color: #f57f28; font-weight: bold'>Breedte</a></td><td class='table_left' style='border:none !important;padding:0'><a>" + width_value + "cm</a></td></tr>";
    }
  }
  var height_element = document.getElementById("inp_height");
  if (height_element) {
    var height_value = height_element.value.trim();
    if (height_value.length > 0) {
      afmeting = 1;
      html3 += "<tr><td class='table_left'  style='border:none !important;padding:0'><a>Hoogte</a></td><td class='table_left' style='border:none !important;padding:0'><a>" + height_value + "cm</a></td></tr>";

    }
  }
  var qty_element = document.getElementById("inp_amount");
  if (qty_element) {
    afmeting = 1;
    var qty_value = qty_element.value.trim();
    if (qty_value.length > 0) {
      //html3 += "<tr><td class='table_left'  style='border:none !important;padding:0'><a>Aantal</a></td><td class='table_left' style='border:none !important;padding:0'><a>" +  qty_value + "cm</a></td></tr>";
    }

  }


  if (afmeting > 0) {
    for (var j = 1; j < 40; j++) {
      var title_element = document.getElementById("a_text2_" + j);
      if (title_element) {
        var title_element_value = title_element.innerText;
        var value_element = document.getElementById("a_text_" + j);
        var value_element_value = value_element.innerText;

        html3 += "<tr><td class='table_left'  style='border:none !important;padding:0'><a>" + title_element_value + "</a></td><td class='table_left' style='border:none !important;padding:0'><a>" + value_element_value + "</a></td></tr>";
      }

    }
  }



  html3 += "</tbody>";
  html3 += "</table>";



  var html2 = "<div style='display:none' id='product_options'>";


  html2 += "<table class='' >";
  html2 += `<thead>
                <tr>
                    <th>
                        <span>Product</span>
                    </th>
                    <th></th>
                    <th>
                        <span>Aantal</span>
                    </th>
                 </tr>   
            </thead>`;
  html2 += "<tbody>";
  html2 += "<tr style='border-top: 1px solid #dee2e6'>";
  var product_img_src = "";
  var product_img = document.getElementsByClassName("fotorama__img");
  if (product_img) {
    product_img_src = product_img.item(0).src;
  }

  html2 += `<td class='last_img_div' style='border:none !important;'>
                <div>
                    <img src='` + product_img_src + `' class='last_img' />
                </div>
            </td>`;


  html2 += "<td style='border:none !important'>" + html3 + "</td>";
  var selected_qty = document.getElementById("qty").value.trim();

  html2 += "<td class='last_img_div2' style='border:none !important'><span>" + selected_qty + "</span</td>";
  html2 += "</tr>";
  
  var accessories_div = document.getElementById("div_product_accessories");
  if (accessories_div)
  {
    var selected_acs = accessories_div.getElementsByClassName("selected");
    if (selected_acs.length > 0)
    {

      for (var m = 0; m < selected_acs.length;m++)
      {
          var div_id = selected_acs.item(m).getAttribute("id");
          if (div_id !== "div_acs_remove")
          {
              var acs_image = selected_acs.item(m).getElementsByTagName("img").item(0).getAttribute("src");
              var acs_qty = selected_acs.item(m).getElementsByClassName("div_asc_qty").item(0).getElementsByTagName("input").item(0).value.trim();
              var acs_name = selected_acs.item(m).getElementsByClassName("card-title").item(1).textContent;
              
              var acs_image_area = "<img src='" + acs_image + "' class='last_img' />";
              acs_qty = parseInt(acs_qty);
              
              if (acs_qty > 0)
              {
                  html2 += "<tr style='border-top: 1px solid #dee2e6;line-height:50px'><td>" + acs_image_area + "</td><td><a>" + acs_name + "</a></td><td><a>" + acs_qty + "</a></td></tr>";
              }
                
             
          }
          
      }
    }
  }

  var selected_total = document.getElementsByClassName("selected_cell").item(0);
  selected_total = selected_total.getAttribute("total");
  
  selected_total = Math.round(selected_total * 100) / 100;
  

  html2 += "<tr style='border-top: 1px solid #dee2e6'><td></td><td  style='color: #f57f28; font-weight: bold; padding: 10px 0 10px 10px;'><a>Totaal excl. btw</a><a style='padding-left:45px'>€ " + selected_total + "</a</td><td></td></tr>";
  var link = window.location.origin;
  html2 += "<tr style='border-top: 1px solid #dee2e6; padding: 10px 0;'><td></td><td><a>Verzendkosten (vanaf)</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id='a_shipping_fee'><img style='width:30px' src='" + link + "/pub/media/materialprice/media/pattern/loading.gif' /></a</td><td></td></tr>";


  html2 += "</tbody>";
  html2 += "</table>";
  html2 += "</div>";

  var customer_message = document.getElementById("cms_customer_message").value;    

  html2 += `<div class="row no-gutters" style="display:none" id="div_product_buttons">
                <div style="width:100%">
                <button onclick="add_to_cart()" class="button btn-info btn-lg btn-block button--fw _has-icon" style="width:100%; background-color: #f57f28">
                <div id="btn_click_div1" style="display: block; text-transform: none; font-weight:bold;>
                    <span class=" text-white"><img src="` + link + `/pub/media/icon/cart.svg" width="16" style="margin: -5px 0 0 0;"><a style="color:#fff !important;margin-left:5px">Toevoegen aan winkelwagen</a></div> 
                    <div id="btn_click_div2" style="display: none;"><img style="width:30px" src="` + link + `/pub/media/materialprice/media/pattern/loading.gif"></div>
                </button>
                </div>
                <div id="div_customer_message">` + customer_message + `</div>
                

             </div>`;

  var customer_id = document.getElementById("inp_customerid").value.trim();
  if (customer_id.length > 0) {
    html2 += `<div style='width:100%;text-align:center'>
                        <a style='cursor:pointer;color:blue;text-decoration:underline' onclick='save_to_my_producten()'>Samestelling Opslaan</a>
                </div>`;
  }

  document.getElementById("div_panel").innerHTML = html2;
  document.getElementById("btn_show_options").style.display = "none";
  document.getElementById("div_panel").style.display = "none";
  document.getElementById("product_options").style.display = "none";
  document.getElementById("div_product_buttons").style.display = "none";

}

function save_to_my_producten() {
  document.getElementById("div_message").innerHTML = "";
  document.getElementById("open_small_modal").click();
}

function arrayMin(arr) {
  var len = arr.length,
    min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
};

var received_data;
var received_data2;

function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curtop];
  }
}



function select_price20(day, qty, obj) {
    setTimeout(show_product_options,500);
  if (document.getElementById("product_options"))
  {
    document.getElementById("product_options").style.display = "none";
  }
  if (document.getElementById("div_product_buttons"))
  {
    document.getElementById("div_product_buttons").style.display = "none";
  }
  
  
  slide_to_div("price_table");

  var tott = obj.getAttribute("total");

  document.getElementById("qty").value = qty;
  //get_selected_ringen2(qty);
  var inp_calculate_value = document.getElementById("inp_calculate").value;
  if (inp_calculate_value == "0") {
    get_selected_ringen2(1);
  }

  var oplage_element_str = "";


  var Productiedagen_element = document.getElementById("inp_day");
  var day2 = "";
  if (day == '0') {
    day2 = 'sameday';
  } else {
    day2 = day;
  }

  Productiedagen_element.value = day2;

  var oplage_element = document.getElementById("inp_qty");
  var per_meter_element = document.getElementById("inp_permeter");
  var per_stuk_element = document.getElementById("inp_perstuk");

  var oplage_element_id = 0;

  if (oplage_element !== undefined) {
    //oplage_element.value = qty;
    oplage_element.value = 1;
    document.getElementById("qty").value = qty;

    oplage_element_id = oplage_element.id;

    oplage_element_str = "Oplage per ontwerp";
  }

  if (per_meter_element !== undefined) {
    // per_meter_element.value = qty;
    per_meter_element.value = 1;
    document.getElementById("qty").value = qty;

    oplage_element_str = "Oplage per meter";
  }

  if (per_stuk_element !== undefined) {
    //per_stuk_element.value = qty;
    per_stuk_element.value = 1;
    document.getElementById("qty").value = qty;

    oplage_element_str = "Oplage per stuk";
  }


  var date = get_date(day);
  var day_ = date.day;
  var month = date.month;
  var year = date.year;
  var day_name = date.day_name;

  date = day_name + " " + day_ + "-" + month + "-" + year;



  var date_element = document.getElementById("inp_leverdatum");
  date_element.value = date;

  jQuery('#price_table td').addClass("nonselected_cell");
  jQuery('#price_table td').removeClass("selected_cell");

  obj.classList.remove("nonselected_cell");
  document.getElementById("trr_oplage").getElementsByTagName("td").item(0).className = "selected_cell";
  document.getElementById("trr_oplage").getElementsByTagName("td").item(1).className = "selected_cell";

  //obj.classList.add("selected_cell");

  var td_price_element = "td_" + day + "_" + qty;
  var el2 = document.getElementById("td_" + day + "_" + qty);
  var exl_price = el2.getElementsByClassName("div_0").item(0).innerHTML;

  if (day == 0) {
    day = 'same day';
  }
  get_other_prices2(qty, tott);
  calculate_shipping_fee();
  show_dv_right2(qty);
}

function select_price2(day, qty, obj) {

    setTimeout(show_product_options,500);
  if (document.getElementById("product_options"))
  {
    document.getElementById("product_options").style.display = "none";
  }
  if (document.getElementById("div_product_buttons"))
  {
    document.getElementById("div_product_buttons").style.display = "none";
  }
  
  
  slide_to_div("price_table");

  var tott = obj.getAttribute("total");

  document.getElementById("qty").value = qty;
  //get_selected_ringen2(qty);
  var inp_calculate_value = document.getElementById("inp_calculate").value;
  if (inp_calculate_value == "0") {
    get_selected_ringen2(1);
  }

  var oplage_element_str = "";


  var Productiedagen_element = document.getElementById("inp_day");
  var day2 = "";
  if (day == '0') {
    day2 = 'sameday';
  } else {
    day2 = day;
  }

  Productiedagen_element.value = day2;

  var oplage_element = document.getElementById("inp_qty");
  var per_meter_element = document.getElementById("inp_permeter");
  var per_stuk_element = document.getElementById("inp_perstuk");

  var oplage_element_id = 0;

  if (oplage_element !== undefined) {
    //oplage_element.value = qty;
    oplage_element.value = 1;
    document.getElementById("qty").value = qty;

    oplage_element_id = oplage_element.id;

    oplage_element_str = "Oplage per ontwerp";
  }

  if (per_meter_element !== undefined) {
    // per_meter_element.value = qty;
    per_meter_element.value = 1;
    document.getElementById("qty").value = qty;

    oplage_element_str = "Oplage per meter";
  }

  if (per_stuk_element !== undefined) {
    //per_stuk_element.value = qty;
    per_stuk_element.value = 1;
    document.getElementById("qty").value = qty;

    oplage_element_str = "Oplage per stuk";
  }


  var date = get_date(day);
  var day_ = date.day;
  var month = date.month;
  var year = date.year;
  var day_name = date.day_name;

  date = day_name + " " + day_ + "-" + month + "-" + year;



  var date_element = document.getElementById("inp_leverdatum");
  date_element.value = date;

  jQuery('#price_table td').addClass("nonselected_cell");


  jQuery('#price_table td').removeClass("selected_cell");

  var parentElement = obj.parentElement;
  parentElement.getElementsByTagName("td").item(0).className = "selected_cell";
  parentElement.getElementsByTagName("td").item(1).className = "selected_cell";

  //obj.classList.remove("nonselected_cell");
  console.log(obj);


  //obj.classList.add("selected_cell");

  var td_price_element = "td_" + day + "_" + qty;
  var el2 = document.getElementById("td_" + day + "_" + qty);
  var exl_price = el2.getElementsByClassName("div_0").item(0).innerHTML;

  if (day == 0) {
    day = 'same day';
  }
  get_other_prices(qty, tott);
  calculate_shipping_fee();
  show_dv_right2(qty);

  //document.getElementById("btn_show_options").style.display = "block";


}

function calculate_shipping_fee() {
  var arr = [];
  var pname = document.getElementById("inp_pname").value;
  var knm = 0;
  for (var i = 0; i < 30; i++) {


    var content_id = "div_content_" + i;
    var label_id   = "div_label_" + i;

    var label_display = "";
    if (document.getElementById(label_id))
    {
      label_display =  document.getElementById(label_id).style.display;
    }

    if (document.getElementById(content_id) && label_display == "block")

    {
      var cards = document.getElementById(content_id).getElementsByClassName("card");
      if (cards.length == 0) {
        if (document.getElementById("inp_width")) {
          var width = document.getElementById("inp_width").value;
          var height = document.getElementById("inp_height").value;
          var amount = document.getElementById("inp_amount").value;

          var new_arr = new Object();
          new_arr.pname = pname;
          new_arr.level = i;
          new_arr.opt_id = "";
          new_arr.value1 = width;
          new_arr.value2 = height;
          new_arr.value3 = amount;

          arr.push(new_arr);
          knm = i;

        }
      } else {
        var selected_item = document.getElementById(content_id).getElementsByClassName("selected")
        if (selected_item.length > 0) {
          selected_item = selected_item.item(0);
          var onclick_str = selected_item.getAttribute("onclick");

          if (onclick_str) {
            var splitt = onclick_str.split(",");
            var selected_id = splitt[2];

            var new_arr = new Object();
            new_arr.pname = pname;
            new_arr.level = i;
            new_arr.opt_id = selected_id;
            new_arr.value1 = "";
            new_arr.value2 = "";
            new_arr.value3 = "";

            arr.push(new_arr);
            knm = i;
          } else {
            var button_count = selected_item.getElementsByTagName("button").length;
            if (button_count > 0) {
              var button_element = selected_item.getElementsByTagName("button").item(0);
              var inp_element = selected_item.getElementsByTagName("input").item(0);
              var button_onclick_str = button_element.getAttribute("onclick");

              var splitt = button_onclick_str.split(",");
              var selected_id = splitt[3];

              var new_arr = new Object();
              new_arr.pname = pname;
              new_arr.level = i;
              new_arr.opt_id = selected_id;
              new_arr.value1 = inp_element.value.trim();
              new_arr.value2 = "acsp";
              new_arr.value3 = "";

              arr.push(new_arr);
              knm = i;


            }
          }

        }
      }



    }
  }



  var accessories_divs = document.getElementById("div_product_accessories").getElementsByClassName("selected");
  if (accessories_divs.length > 0) {
    for (var j = 0; j < accessories_divs.length; j++) {
      var option_id = accessories_divs.item(j).id;
      option_id = option_id.replace("div_acs_", "");

      var input = accessories_divs.item(j).getElementsByTagName("input");
      if (input.length > 0) {
        var input_value = accessories_divs.item(j).getElementsByTagName("input").item(0).value.trim();
        var new_arr = new Object();
        new_arr.pname = pname;
        new_arr.level = knm + 1;
        new_arr.opt_id = option_id;
        new_arr.value1 = input_value;
        new_arr.value2 = "acs";
        new_arr.value3 = "";




        arr.push(new_arr);
      }
    }

  }

  var new_arr = new Object();
  new_arr.json = arr;
  new_arr.productname = document.getElementById("inp_pname").value.trim();
  new_arr.productid = document.getElementById("inp_pid").value.trim();
  new_arr.customerid = document.getElementById("inp_customerid").value.trim();
  new_arr.customeremail = document.getElementById("inp_customeremail").value.trim();
  new_arr.site = window.location.hostname;

  var myJsonString = JSON.stringify(new_arr);
  //myJsonString = myJsonString.replace(/"/gi, "'");
  console.log(myJsonString);


  var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

  //myJsonString = JSON.stringify(myJsonString);
  console.log(myJsonString);

  //alert(myJsonString);


  var productid = document.getElementById("inp_pid").value.trim();
  var selected_cell = document.getElementsByClassName("selected_cell").item(1);
  var selected_cell_id = selected_cell.id;
  var selected_cell_split = selected_cell_id.split("_");
  var qty = selected_cell_split[2];
  var leverdatum = document.getElementById("inp_leverdatum").value;
  var day = selected_cell_split[1];
  if (day > 0) {
    
    jQuery.ajaxSetup(
              {
                cache: false
              });
              
    jQuery.post(link, {
        json: myJsonString,
        productid: productid,
        qty: qty,
        l: leverdatum,
        m: "calculateshippinfee"
      },
      function(data, status) {
        //console.log(data);
        //  alert(data);
        if (data) {
          if (data.length > 0) {
            var json = JSON.parse(data);
            //console.log(json);
            
            var stat = json.status;
            if (stat == "ok") {
              var shipping_fee = "";
              var shipping_fee_with_tax = "";
              var prices = json.prices;

              var shipping_prices_array = new Array();
              for (var i = 0; i < prices.length; i++) {
                var deliveries = prices[i].deliveries;
                for (var j = 0; j < deliveries.length; j++) {
                  var shipping_method = deliveries[j].shipping_method_api_code;
                  if (shipping_method.indexOf("pickup-") == -1)
                  {
                    var shipping_prices = deliveries[j].prices;
                    var shipping_purchase_price = shipping_prices.purchase_price;
                    var purchase_price_incl_vat = shipping_prices.purchase_price_incl_vat;

                    shipping_prices_array.push(shipping_purchase_price);
                  }
                  
                }

              }


              shipping_fee = arrayMin(shipping_prices_array);
              shipping_fee = shipping_fee.toFixed(2);
              document.getElementById("a_shipping_fee").innerHTML = "€&nbsp;" + shipping_fee;


            }
            else
            {
               document.getElementById("a_shipping_fee").innerHTML = "€&nbsp;53";
            }
          } else {
            alert("An error occured.Please contact to the company");
          }
        }



      });

  }
  //document.getElementById("btn_show_options").style.display = "block";

}

function get_option_text(opt_id, level) {

  if (level > 1 && opt_id !== null) {
    var text = 0;
    level = level - 1;
    var content_element = document.getElementById("div_content_" + level);
    var divs = content_element.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
      var onclick_element = divs.item(i).getAttribute("onclick");
      if (onclick_element !== null) {
        var split = onclick_element.split(",")[2];
        if (split == opt_id) {
          var title = divs.item(i).getElementsByClassName("card-title").item(0).innerHTML;

          document.getElementById("a_text_" + level).innerText = title;
        }

      }

    }
  }

}

function get_option_text2(opt_id, level) {

  if (level > 0 && opt_id !== null) {
    var text = 0;
    level = level - 1;
    if (level < 0)
    {
        level = 0;
    }
    var content_element = document.getElementById("div_content_" + level);
    var divs = content_element.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
      var onclick_element = divs.item(i).getAttribute("onclick");
      if (onclick_element !== null) {
        var split = onclick_element.split(",")[2];
        if (split == opt_id) {
          var title = divs.item(i).getElementsByClassName("card-title").item(0).innerHTML;

          document.getElementById("a_text_" + level).innerText = title;
        }

      }

    }
  }

}


function clear_divs(level)
{
	for (var i = level;i <= 30;i++)
	{
		var label_div 	= "div_label_" + level.toString();
		var content_div = "div_content_" + level.toString();

		if (document.getElementById(label_div))
		{
			document.getElementById(label_div).innerHTML = "";
			document.getElementById(content_div).innerHTML = "";
		}
	}
}


function get_opt(optionarray, level, opt_id, opt_id2, last, obj, sel, acs) {
  clear_divs(level);
    
  var inp_pid = document.getElementById("inp_pid");
  if (inp_pid) {

  } 
  else 
  {
    return;
  }


  show_down(level);
  if (level > 0) 
  {
    setTimeout(show_down(level - 1), 300);
  }

  if (document.getElementById("inp_amount") == null)
  {
      get_option_text2(opt_id, level);
  }
  else
  {
      get_option_text(opt_id, level);
  }
  
  
  document.getElementById("div_product_quantity2").innerHTML = "";
  document.getElementById("div_product_accessories").innerHTML = "";
  document.getElementById("div_other_prices").innerHTML = "";
  document.getElementById("div_panel").innerHTML = "";
  document.getElementById("btn_show_options").style.display = "none";
  document.getElementById("btn_go_on").style.display = "none";






  if (sel == 1 && acs == 0) {
    select_current(level, obj);
  }
  if (sel == 1 && acs == 1) {
    select_current2(level, obj);
  }
  remove_divs(level);
  var pname = document.getElementById("inp_pname").value;
  if (last == 0) {
    var width = 0;
    var height = 0;
    var amount = 0;
    if (document.getElementById("inp_width")) {
      width = document.getElementById("inp_width").value.trim();
    };
    if (document.getElementById("inp_height")) {
      height = document.getElementById("inp_height").value.trim();
    };
    if (document.getElementById("inp_amount")) {
      amount = document.getElementById("inp_amount").value.trim();
    };
    
    var http = new XMLHttpRequest();
    
    
    var url = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


    var params = 'm=getopt&level=' + level + '&parent=' + opt_id + '&pname=' + pname + '&width=' + width + '&height=' + height + '&amount=' + amount;

    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() { //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        var data = http.responseText;




        if (data.length > 0) {
          var json = JSON.parse(data);
          var title = "";
          if (json[0].title) {
            title = json[0].title;
          }





          var html1 = `<a style="float:left">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fac" data-icon="input-radio-backdrop" class="svg-inline--fa fa-input-radio-backdrop fa-w-14 fa-7 text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 437 512"></svg>
                                                </a>
                                                <a style="position:absolute;display:none" id="a_check_` + level + `">
                                                <i class="fa fa-check" style="color: #f57f28; margin: -10px 10px 0 0"></i>
                                                </a>
                                                
                                                <div style="width:auto;float:left;text-indent:10px"><a id="a_text2_` + level + `" >` + title + `</a><\/div>
                                                
                                                <div style="float:right">
                                                
                                                    <a style="font-weight:normal" id="a_text_` + level + `"></a>
                                                    <a id="a_up_` + level + `" onclick="show_down(` + level + `)" style="float:right;width: 20px;padding-left: 5px;cursor: pointer;"><i class="fa fa-angle-up" style="color: #f57f28; margin: -10px 10px 0 0"></i></a>
                                                    <a id="a_down_` + level + `" onclick="show_up(` + level + `)" style="float:right;width: 20px;padding-left: 5px;cursor: pointer;display:none"><i class="fa fa-angle-up" style="color: #f57f28; margin: -10px 10px 0 0"></i></a>
                                                    
                                                </div>`;
                                              
            
          document.getElementById("div_label_" + level).innerHTML = html1;                                 
          document.getElementById("div_label_" + level).style.display = "block";                                    
          



          var html2 = "";

          var width_count = 0;
          var width_min_value = 0;
          var width_max_value = 0;

          var height_count = 0;
          var height_min_value = 0;
          var height_max_value = 0;

          var amount_count = 0;

          var sizes = 0;
          if (json.length > 0) {
            for (var i = 0; i < json.length; i++) {
              var opt_code = json[i].codee;
              var min_value = json[i].min_value;
              var max_value = json[i].max_value;
              if (opt_code == 'width') {
                width_min_value = min_value;
                width_max_value = max_value;

                width_count += 1;
                sizes += 1;
              }
              if (opt_code == 'height') {
                height_min_value = min_value;
                height_max_value = max_value;

                height_count += 1;
                sizes += 1;
              }
              if (opt_code == 'amount') 
              {
                amount_count += 1;
                sizes += 1;
              }
              
              if (opt_code.indexOf("quantity-") >= 0)
              {
                  sizes = 0;
              }
              
              
            }
          }

          if (sizes > 0) 
          {
            var div_size_notification = "";

            if (width_min_value > 0 && width_max_value > 0 && height_min_value > 0 && height_max_value > 0) {
          
              div_size_notification = `<div id="div_size_notification">
<a>Kies een breedte tussen ` + width_min_value + ` en ` + width_max_value + ` cm en een hoogte tussen ` + height_min_value + ` en ` + height_max_value + ` cm.</a></div>`;
            }

            onclick_str = "size_control(optionsarray," + (level + 1) + "," + json[0].id + "," + last + ");";
           
            html2 =  div_size_notification;
            if (width_count > 0) {
              html2 += `<div class="input-group col-sm-4 col-lg-4" style="padding:0;color: rgb(0,65,97) !important;clear:left;float:left;margin:10px 0;">
										<label class="control-label input-group-text" style="" for="width">Breedte: <\/label><br>
										<input type="text" min="` + width_min_value + `" max="` + width_max_value + `" autocomplete="off" onkeyup="num_control2()" class="form-control" onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46'  placeholder="" id="inp_width" style="float:left;width:50px;" aria-label="width" aria-describedby="basic-addon0">
										<div class="input-group-append" style="float:left">
											<span class="input-group-text" id="basic-addon0">cm<\/span>
										<\/div>
									<\/div>`;
            }
            if (height_count > 0) {
              html2 += `<div class="input-group  col-sm-4 col-lg-4"  style="padding:0;float:left; margin:10px 0 8px 8px;">
											<label class="control-label input-group-text"  style="" for="height">Hoogte: <\/label><br>
											<input type="text" min="` + height_min_value + `" max="` + height_max_value + `"  autocomplete="off" onkeyup="num_control2()" onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46'   class="form-control" placeholder="" id="inp_height" style="width:50px;float:left;" aria-label="height" aria-describedby="basic-addon1">
											<div class="input-group-append" style="float:left;">
												<span class="input-group-text" id="basic-addon1">cm<\/span>
											<\/div>
									<\/div>`;
            }
            if (amount_count > 0) {
              html2 += `<div class="input-group col-sm-4 col-lg-4"  style="padding:0;float:left; margin:10px 0 8px 8px;">
											<label class="control-label input-group-text"  style="padding:0;float:left;  clear: right;" for="amount">Aantal: <\/label><br>
											<input type="text" autocomplete="off" onkeypress='return (event.charCode >= 48 && event.charCode <= 57)' onkeyup="num_control2()"   class="form-control" placeholder="" style="float:left;width:50px;" id="inp_amount" aria-label="amount" aria-describedby="basic-addon2">
											<div class="input-group-append" style="float:left">
												<span class="input-group-text" id="basic-addon2">st<\/span>
											<\/div>
									<\/div>`;
            }
            
            var base_url = window.location.origin;
            if (height_count > 0 || width_count > 0) {
              

              html2 += `<div id="div_under_aantal"><a onclick="recalculate2()"><img src="` + base_url + `/pub/media/icon/recalculate.svg"></a></div>`;
            }
            else
            {
                 html2 += `<div id="div_under_aantal" style="float:left !important;margin-left:20px"><a onclick="recalculate2()"><img src="` + base_url + `/pub/media/icon/recalculate.svg"></a></div>`;
           
            }

            html2 += `<div class="form-group">        
                              <div>
                                <button type="button" class="btn btn-block" style="width:100%;background-color:#f60;text-transform:none" onclick="` + onclick_str + `">Ga Verder<\/button>
                              <\/div>
                            <\/div>`;

            document.getElementById("div_content_" +level).innerHTML = html2;
            document.getElementById("div_content_" +level).style.display = "block";





          } 
          else 
          {
            html2 = `<div id="div_content_` + level + `" style="margin-top:10px;">`;
            for (var i = 0; i < json.length; i++) {
              var id = json[i].id;
              var id2 = json[i].id2;
              var opt_code = json[i].codee;
              var name = json[i].name;
              var image = json[i].image;
              var image2 = image;
              var tit =   json[i].title; 

              var api_link = document.getElementById("api_link").value;
            
              
              if (image.indexOf("http") == -1)
              {
                  image = api_link + "/option_images/" + image;
              }
              if (image2 == "")
              {
                  image = "";
                  
              }
              
            
              var _level = json[i].level;
              var description = json[i].description;
              var parent_id = json[i].parent_id;
              var valuee = json[i].valuee;
              var available = json[i].available;

              var son = json[i].son;
              
              if (tit == "Oplage")
              {
                  son = 2;
              }

              if (!description) {
                description = "";
              }

              var image_str = "";
              
              if (image2 !== "") 
              {
                image_str = `<img class="card-img-top" src="` + image + `" alt="" style="width:100%" />`;
              }
                

              if (valuee) 
              {
                var image_str = "";
             
                if (image2 !== "") 
                {
                   
                       image_str = `<img class="card-img-top" src="` + image + `" alt="" style="height:100px;width:100px;margin-left:auto;margin-right:auto" />`;
                   
                  
                }
              
                onclick_str = "num_control(this,optionsarray," + (level + 1) + "," + id + "," + id2 + "," + son + ",this,1,1);";
                
                if (tit == "Oplage")
                {
                    html2 += `<div class="card col-sm-4 col-lg-4" style="position:relative;padding-bottom:10px;float:left;cursor:pointer;margin-bottom:10px;height:150px !important">`;
                }
                else
                {
                    html2 += `<div class="card col-sm-4 col-lg-4" style="position:relative;padding-bottom:10px;float:left;cursor:pointer;margin-bottom:10px;">`;
                }
                
                
                                            
                html2 +=  image_str ;
                
                html2 += `<div class="card-body" style="position:relative">
                                <h6 class="card-title" style="font-size:0.9em">` + name + `<\/h6>
                                                    <p class="card-text" style="font-size:9px">` + description + `<\/p>
                                                <\/div>
                                            <div style="width:100%;margin-bottom:20px">
                                                    <input type="text" class="inp_tun" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46" value="` + valuee + `" />
                                                  <button type="button" style="float:right;border-radius:10px" class="btn btn-info" onclick=` + onclick_str + `>Doorgaan<\/button>
                                                <\/div>
                                                 <div class="checkedBox3">
                                                       <i class="fa fa-check text-right checkmark checkedBox" style="color:#f57f28; font-size: 20px;display:none"></i>
                                                   </div>
                                        <\/div>`;
              } 
              else 
              {
                
                var av_1_str = "";
                var av_2_str = "";
                
                
                
                onclick_str = "get_opt(optionsarray," + (level + 1) + "," + id + "," + id2 + "," + son + ",this,1,0)";
                
                 if (available == "0")
                {
                    av_1_str = " notavailable";
                    onclick_str = "return false;";
                    av_2_str = "<div class='div_not_available'>Deze optie is niet beschikbaar voor het opgegeven formaat.</div>";
                }
                
                
                if (tit == "Oplage")
                {
                    
                    html2 += `<div class="card col-sm-4 col-lg-4` + av_1_str + `" style="float:left;cursor:pointer;margin-bottom:10px;height:150px !important" onclick=` + onclick_str + `>`;
                }
                else
                {
                    html2 += `<div class="card col-sm-4 col-lg-4` + av_1_str + `" style="float:left;cursor:pointer;margin-bottom:10px" onclick=` + onclick_str + `>`;
                }
                
                
                html2 += av_2_str;
                                               
                html2 += image_str;
                html2 += `<div class="card-body" style="position:relative">
                                                <div class="checkedBox2">
                                                       <i class="fa fa-check text-right checkmark checkedBox" style="color:#f57f28; font-size: 20px;display:none"></i>
                                                   </div>
                                                <h6 class="card-title" style="font-size:0.9em">` + name + `<\/h6>
                                              
                                                <p class="card-text" style="font-size:9px">` + description + `<\/p>

                                            <\/div>
                                        <\/div>`;
              }

            }
            html2 += `<\/div>`;
            
            document.getElementById("div_content_" + level).innerHTML = html2;
            document.getElementById("div_content_" + level).style.display = "block";

            //setTimeout(resize_heights(level),1500);
            slide_selected(level, last);
            show_down(level - 1);
            
            var level_minus = level - 1;
            if (level_minus >= 0)
            {
                document.getElementById("a_check_" + (level - 1)).style.display = "block";
            }
            
          }
        }


      }
    }
    http.send(params);
  } 
  if (last == 1)  
  {
    get_accessories(opt_id);
    //document.getElementById("div_product_quantity2").innerHTML = '  <img height="200" src="' + location.protocol + '//' + location.hostname  + '/pub/media/materialprice/media/pattern/loading.gif"  style="width:30px;height:30px" width="200"><\/img>';
    //show_down(level - 1);    
    document.getElementById("a_check_" + (level - 1)).style.display = "block";
    setTimeout(calculate_table,200);
    //document.getElementById("btn_go_on").style.display = "inline-block";
    document.getElementById("btn_show_options").style.display = "none";
  }
  if (last == 2)
  {
      get_accessories(opt_id);
      document.getElementById("btn_show_options").style.display = "none";
      //alert("calculate");
      setTimeout(calculate_table2,200);
  }

}



function calculate_table2() 
{
    
    var pname = document.getElementById("inp_pname").value;
    if (pname == "Posters" || pname == "Reclameposters")
    {
        calculate_posters();
    }
    else
    {
        var link = window.location.origin;
        document.getElementById("div_product_quantity2").innerHTML = "";
        document.getElementById("div_other_prices").innerHTML = "";
        document.getElementById("div_panel").style.display = "none";

        myJsonString = get_product_json();
        console.log(myJsonString);

        var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);
        var posted_data = "m=getpricetable&data=" + myJsonString;

        document.getElementById("inp_jsonstring").value = myJsonString;
        jQuery.ajaxSetup({cache: false});
              
        jQuery.post(link, {
              m: "getpricetablemainnew4",
              dat: myJsonString,
              site: "vlaggenactie",
              customeremail: document.getElementById("inp_customeremail").value.trim(),
              customerid: document.getElementById("inp_customerid").value.trim(),
              productid: document.getElementById("inp_pid").value.trim(),
              producttype: document.getElementById("inp_pname2").value.trim()
              
            },
            function(data, status) 
            {
                if (data) 
                {
                    console.log(data);
                    if (data.indexOf("{") !== -1)
                    {
                        data = data.substring(data.indexOf("{"), data.length);
                    }
                    data = JSON.parse(data);
                    var stat = data.stat;
                    
                    if (stat == 'fail') 
                    {
                      //alert(data.msg);
                    } 
                    else 
                    {
                        document.getElementById("div_product_quantity2").innerHTML = "";
                        document.getElementById("div_other_prices").innerHTML = "";
                        document.getElementById("div_panel").innerHTML = "";
            
                        received_data = data;
                        fill_tablee5(data);
                        document.getElementById("div_product_quantity2").style.display = "none";
                        if (document.getElementById('div_panel')) 
                        {
                            document.getElementById('div_panel').scrollIntoView({
                            behavior: 'smooth',
                            block: 'end'
                          });
                        }
                    }

                }
            });
        }
    }
    
    
function remove_all_acs(obj) {
  jQuery(".div_acss").attr("class", "card col-sm-4 col-lg-4 div_acss");

  jQuery(".div_acs_top").css("position", "unset");
  jQuery(".div_acs_top").css("margin-left", "0");


  jQuery(".div_asc_qty").css("position", "absolute");
  jQuery(".div_asc_qty").css("margin-left", "-50000px");



  //setTimeout(calculate_table,200);
  document.getElementById("btn_go_on").style.display = "inline-block";
  document.getElementById("btn_show_options").style.display = "none";
  addClassname("selected", obj);
  
  setTimeout(function()
  {
    
    document.getElementById("btn_go_on").click();  
  },100);
  
}




function fill_tablee5(data) {
 

  if (data == undefined) {
    //alert("I cant get the price table from server. Please check the file you have uploaded in admin panel");
  }


  var days_dizi = new Array();
  tax = document.getElementById("inp_tax").value;
  //var json = JSON.parse(data);
  var json = data;
  var days = json.days;
  var prices = json.prices;
  var day_definition = json.day_definition;
  day_definition_arr = day_definition;

  var url = new URL(window.location);
  var c = url.searchParams.get("type");

    

    days = days.substring(0, days.length - 1);

 
  var product_img_src = "";
  var product_img = document.getElementsByClassName("fotorama__img");
  if (product_img) {
    product_img_src = product_img.item(0).src;
  }
  var product_img_str = "<img src='" + product_img_src + "' class='last_img' />";
  
  var link = window.location.origin;
  var shipping_img_str  = "<img style='width:30px' src='" + link + "/pub/media/materialprice/media/pattern/loading.gif' />";
  
  var option_html = "<table><tbody>";
  for (var j = 0; j < 40; j++) {
      var title_element = document.getElementById("a_text2_" + j);
      if (title_element) {
        var title_element_value = title_element.innerText;
        var value_element = document.getElementById("a_text_" + j);
        var value_element_value = value_element.innerText;
        
        if (title_element_value !== "Oplage"){
            option_html += "<tr><td class='table_left'  style='border:none !important;padding:0 !important'><a>" + title_element_value + "</a></td><td class='table_left' style='border:none !important;padding:0 !important'><a>" + value_element_value + "</a></td></tr>";
        }
          
          
          
      }

    }
    option_html += "</tbody></table>";
  
  
  
  var html = "";
  if (prices) {
      var price_element  =  prices[0];
      var price = price_element.price_10;
      var adet = price_element.adet;
        
        document.getElementById("qty").value = adet;
        
        html += `<div style="display: block;" id="product_options">
                    	<table class="">
                    		<thead>
                    			<tr>
                    				<th> <span>Product</span> </th>
                    				<th></th>
                    				<th> <span>Aantal</span> </th>
                    			</tr>
                    		</thead>
                    		<tbody>
                    			<tr style="border-top: 1px solid #dee2e6">
                    				<td class="last_img_div" style="border:none !important;">
                    					<div>` +  product_img_str  + `</div>
                    				</td>
                    				<td style="border:none !important">` + option_html + `</td>
                    				<td class="last_img_div2" style="border:none !important"><span>` +  adet + `</span></td>
                    			</tr>
                    			<tr style="border-top: 1px solid #dee2e6">
                    				<td></td>
                    				<td style="color: #f57f28; font-weight: bold; padding: 10px 0 10px 10px;"><a>Totaal excl. btw</a><a style="padding-left:45px">€ ` + price + `</a></td>
                    				<td></td>
                    			</tr>
                    			<tr style="border-top: 1px solid #dee2e6; padding: 10px 0;">
                    				<td></td>
                    				<td><a>Verzendkosten (vanaf)</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="a_shipping_fee">` +  shipping_img_str  + `</a></td>
                    				<td></td>
                    			</tr>
                    		</tbody>
                    	</table>
                    </div>`;

        html += `<div class="row no-gutters" style="display: flex;" id="div_product_buttons">
                <div style="width:100%">
                <button onclick="add_to_cart()" class="button btn-info btn-lg btn-block button--fw _has-icon" style="width:100%; background-color: #f57f28">
                <div id="btn_click_div1" style="display: block; text-transform: none; font-weight:bold;>
                    <span class=" text-white"=""><img src="https://vlaggenactie.nl/pub/media/icon/cart.svg" width="16" style="margin: -5px 0 0 0;"><a style="color:#fff !important;margin-left:5px">Toevoegen aan winkelwagen</a></div> 
                    <div id="btn_click_div2" style="display: none;"><img style="width:30px" src="https://vlaggenactie.nl/pub/media/materialprice/media/pattern/loading.gif"></div>
                </button>
                </div>

             </div>`;


 
  } 
  else 
  {
    html = "<h1>There is no price setted for your account. Please talk to your sales manager<\/h1>";
  }
    document.getElementById("div_panel").innerHTML = html;
    document.getElementById("div_panel").style.display = "block";

    calculate_shipping_fee2();    

}


function calculate_shipping_fee2() {
  var arr = [];
  var pname = document.getElementById("inp_pname").value;
  var knm = 0;
  for (var i = 0; i < 30; i++) {


    var content_id = "div_content_" + i;
    var label_id   = "div_label_" + i;

    var label_display = "";
    if (document.getElementById(label_id))
    {
      label_display =  document.getElementById(label_id).style.display;
    }

    if (document.getElementById(content_id) && label_display == "block")

    {
      var cards = document.getElementById(content_id).getElementsByClassName("card");
      if (cards.length == 0) {
          width = "";
          height = "";
          amount = "";
          
          if (document.getElementById("inp_width"))
          {
              width = document.getElementById("inp_width").value;
          }
          
          if (document.getElementById("inp_height"))
          {
              height = document.getElementById("inp_height").value;
          }
          
          if (document.getElementById("inp_amount"))
          {
              amount = document.getElementById("inp_amount").value;
          }
          
          if (width.length > 0 || height.length > 0 || amount.length > 0)
          {
                var new_arr = new Object();
                new_arr.pname = pname;
                new_arr.level = i;
                new_arr.opt_id = "";
                new_arr.value1 = width;
                new_arr.value2 = height;
                new_arr.value3 = amount;
    
                arr.push(new_arr);
                knm = i;
          }
      } else {
        var selected_item = document.getElementById(content_id).getElementsByClassName("selected")
        if (selected_item.length > 0) {
          selected_item = selected_item.item(0);
          var onclick_str = selected_item.getAttribute("onclick");

          if (onclick_str) {
            var splitt = onclick_str.split(",");
            var selected_id = splitt[2];

            var new_arr = new Object();
            new_arr.pname = pname;
            new_arr.level = i;
            new_arr.opt_id = selected_id;
            new_arr.value1 = "";
            new_arr.value2 = "";
            new_arr.value3 = "";

            arr.push(new_arr);
            knm = i;
          } else {
            var button_count = selected_item.getElementsByTagName("button").length;
            if (button_count > 0) {
              var button_element = selected_item.getElementsByTagName("button").item(0);
              var inp_element = selected_item.getElementsByTagName("input").item(0);
              var button_onclick_str = button_element.getAttribute("onclick");

              var splitt = button_onclick_str.split(",");
              var selected_id = splitt[3];

              var new_arr = new Object();
              new_arr.pname = pname;
              new_arr.level = i;
              new_arr.opt_id = selected_id;
              new_arr.value1 = inp_element.value.trim();
              new_arr.value2 = "acsp";
              new_arr.value3 = "";

              arr.push(new_arr);
              knm = i;


            }
          }

        }
      }



    }
  }



  var accessories_divs = document.getElementById("div_product_accessories").getElementsByClassName("selected");
  if (accessories_divs.length > 0) {
    for (var j = 0; j < accessories_divs.length; j++) {
      var option_id = accessories_divs.item(j).id;
      option_id = option_id.replace("div_acs_", "");

      var input = accessories_divs.item(j).getElementsByTagName("input");
      if (input.length > 0) {
        var input_value = accessories_divs.item(j).getElementsByTagName("input").item(0).value.trim();
        var new_arr = new Object();
        new_arr.pname = pname;
        new_arr.level = knm + 1;
        new_arr.opt_id = option_id;
        new_arr.value1 = input_value;
        new_arr.value2 = "acs";
        new_arr.value3 = "";




        arr.push(new_arr);
      }
    }

  }

  var new_arr = new Object();
  new_arr.json = arr;
  new_arr.productname = document.getElementById("inp_pname").value.trim();
  new_arr.productid = document.getElementById("inp_pid").value.trim();
  new_arr.customerid = document.getElementById("inp_customerid").value.trim();
  new_arr.customeremail = document.getElementById("inp_customeremail").value.trim();
  new_arr.site = window.location.hostname;

  var myJsonString = JSON.stringify(new_arr);
  //myJsonString = myJsonString.replace(/"/gi, "'");
  console.log(myJsonString);


  var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

  //myJsonString = JSON.stringify(myJsonString);
  console.log(myJsonString);

  //alert(myJsonString);


  var productid = document.getElementById("inp_pid").value.trim();
  var qty = document.getElementById("qty").value;

  

    
    jQuery.ajaxSetup(
              {
                cache: false
              });
              
    jQuery.post(link, {
        json: myJsonString,
        productid: productid,
        qty: qty,
        m: "calculateshippinfee"
      },
      function(data, status) {
        //console.log(data);
        //  alert(data);
        if (data) {
          if (data.length > 0) {
            var json = JSON.parse(data);
            //console.log(json);
            
            var stat = json.status;
            if (stat == "ok") {
              var shipping_fee = "";
              var shipping_fee_with_tax = "";
              var prices = json.prices;

              var shipping_prices_array = new Array();
              for (var i = 0; i < prices.length; i++) {
                var deliveries = prices[i].deliveries;
                for (var j = 0; j < deliveries.length; j++) {
                  var shipping_method = deliveries[j].shipping_method_api_code;
                  if (shipping_method.indexOf("pickup-") == -1)
                  {
                    var shipping_prices = deliveries[j].prices;
                    var shipping_purchase_price = shipping_prices.purchase_price;
                    var purchase_price_incl_vat = shipping_prices.purchase_price_incl_vat;

                    shipping_prices_array.push(shipping_purchase_price);
                  }
                  
                }

              }


              shipping_fee = arrayMin(shipping_prices_array);
              shipping_fee = shipping_fee.toFixed(2);
              document.getElementById("a_shipping_fee").innerHTML = "€&nbsp;" + shipping_fee;


            }
            else
            {
               document.getElementById("a_shipping_fee").innerHTML = "€&nbsp;53";
            }
          } else {
            alert("An error occured.Please contact to the company");
          }
        }



      });

  
  //document.getElementById("btn_show_options").style.display = "block";

}



function convert_number(num) {
  return parseFloat(num).toFixed(2);
}

function addClassname(name, element) {
  element.classList.remove(name);
  element.classList.add(name);
}
var timeout;

function searchQty() 
{
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    var number = document.getElementById("price_qty").value;
    var day_qty = document.getElementById("tr_1").getElementsByTagName("td").length - 1;
    document.getElementById("price_qty").disabled = true;
    var customer_id = document.getElementById("inp_customerid").value;
    var product_id = document.getElementById("inp_pid").value;
    var jsonstring = document.getElementById("inp_jsonstring").value;

   
    
    var lnk = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);



    //var product_type = document.getElementById("product_type").value;
    var tds = document.getElementById("trr_oplage").getElementsByTagName("td");

    if (number == '') {
      for (var j = 0; j < day_qty; j++) {
        tds.item(j + 1).innerHTML = "<center>-</center>";
      }
    }

    if (number > 0) {

      var img_ = location.origin + "/pub/media/materialprice/media/pattern/loading.gif";

      for (var j = 1; j < tds.length; j++) {
        tds.item(j).innerHTML = "<center><img src='" + img_ + "' style='height:40px' /></center>";
      }

            jQuery.ajaxSetup(
              {
                cache: false
              });

      jQuery.post(lnk, {
          m: "getpricetablemainnew2",
          customerid: customer_id,
          productid: product_id,
          json: jsonstring,
          num: number,
          type: "single",
          site: "vlaggenactie",
          producttype: document.getElementById("inp_pname2").value.trim()
        },
        function(data, status) {
          //var id_order = get_which_row(number);



  
          var myObj = JSON.parse(data);
          received_data2 = myObj;
          var days = myObj.days;
          var prices = myObj.prices;
          var adet = number;



          for (var m = 0; m < prices.length; m++) {
            var selected_price = prices[m];
            var selected_adet = selected_price.adet;
            if (selected_adet == number) {
              prices = prices[m];
            }

          }
         


          var tds = document.getElementById("trr_oplage").getElementsByTagName("td");

          var row = document.getElementById("trr_oplage");
          
          var first_tds = document.getElementById("tr_1").getElementsByTagName("td");

          if (first_tds.length > tds.length) {
            for (var k = 1; k < tds.length; k++) {
              row.deleteCell(k);
            }
          }
          days = days.split(",");
            
           var price = parseFloat(get_min_price(prices));
      var min_day = parseFloat(get_min_day(prices));  
        
        
          
          
          
         
            if (price == 0) 
            {
                if (tds.item(1)) 
                {
                  var cell1 = tds.item(1);
                  var lnk = location.protocol + '//' + location.hostname + "/media/wysiwyg/matrixprice/icon_call_for_the_price.svg";
                  cell1.outerHTML = `<td id="td_` + day_con2 + `_` + number + `" style="display:table-cell" total="NaN" class="nonselected_cell">
                                                            <img src="` + lnk + `" height="40">
                                                    </td>`;
                } else {
                  var cell1 = row.insertCell(1);
                  var lnk = location.protocol + '//' + location.hostname + "/media/wysiwyg/matrixprice/icon_call_for_the_price.svg";
                  cell1.outerHTML = `<td id="td_` + day_con2 + `_` + number + `" style="display:table-cell" total="NaN" class="nonselected_cell">
                                                            <img src="` + lnk + `" height="40">
                                                    </td>`;
                }

            } 
            else 
            {
              var tax = parseFloat(document.getElementById("inp_tax").value);
              //var day_str3 = price.replace(".", ",");
              var price2 = parseFloat(price) * (100 + tax) / 100;


              var div_0_style = "inline-block";
              var div_1_style = "none";
              var div_d_price = document.getElementById("div_d_price");
              if (div_d_price) {
                div_d_price = div_d_price.innerHTML;
                if (div_d_price.indexOf("incl. BTW") !== -1) {
                  var div_0_style = "none";
                  var div_1_style = "inline-block";
                }
              }



              if (tds.item(1)) {
                var cell1 = tds.item(1);
                cell1.outerHTML = `<td id="td_` + min_day + `_` + number + `" style="display:table-cell;width:60%" total="` + price + `" onclick="select_price20(` + min_day + `,` + number + ` ,this)">
                                                       <div class="div_0" style="display:` + div_0_style + `">€&nbsp;` + price + ` excl.btw</div>
                                                       
                                                       <div class="div_1" style="display:` + div_1_style + `">€&nbsp;` + price2 + ` incl.btw</div>
                                                       
                                                    </td>`;
              } else {
                var cell1 = row.insertCell(1);
                cell1.outerHTML = `<td id="td_` + min_day + `_` + number + `" style="display:table-cell;width:60%" total="` + price + `" onclick="select_price20(` + min_day + `,` + number + ` ,this)">
                                                       <div class="div_0" style="display:` + div_0_style + `">€&nbsp;` + price + ` excl.btw</div>
                                                       
                                                       <div class="div_1" style="display:` + div_1_style + `">€&nbsp;` + price2 + ` incl.btw</div>
                                                       
                                                    </td>`;
              }

            }



    




          var table = document.getElementById("price_table");




          var selected_td = document.getElementsByClassName("selected_cell");
          if (selected_td.length > 0) {
            var selectedtd = selected_td[0];
            var selectedtd_id = selectedtd.id;
            if (selectedtd_id == "") {
              var oplage_tr = document.getElementById("trr_oplage");
              selectedtd = oplage_tr.getElementsByTagName("td").item(1);
              selectedtd_id = selectedtd.id;

            }

            var selectedtd_split = selectedtd_id.split("_");
            var selected_day = selectedtd_split[1];
            var selected_qty = selectedtd_split[2];

            //var selected_day = document.getElementById("div_date1").getElementsByTagName("dd")[0].innerHTML;
            //var selected_qty = document.getElementById("div_oplage").getElementsByTagName("dd")[0].innerHTML;
            var td_id = "td_" + selected_day + "_" + adet;

            document.getElementById(td_id).click();



          }
          document.getElementById("price_qty").disabled = false;
        });
    }
  }, 2000);
}

function get_date(day) {
  var day_definition = day_definition_arr;
  if (day_definition == undefined) {
    //alert("Day Definition is undefined.Please check the xls file in produduct template");
  }
  var day_snc = new Array();
  for (var i = 0; i < day_definition.length; i++) {
    var day2 = day_definition[i]["which_day"];
    if (day2 == day) {
      return day_definition[i];
    }

  }
}

function get_titles() {
  var out = [];
  for (var i = 1; i < 50; i++) {
    var title_element = "a_text2_" + i;
    if (document.getElementById(title_element)) {
      var title = document.getElementById(title_element).innerHTML.trim();

      var value_element = "a_text_" + i;
      var value = document.getElementById(value_element).innerHTML.trim();

      var item = [];
      item.push(title);
      item.push(value);

      out.push(item);

    }

  }
  return out;
}





function get_accessories(option_id) {
  var pt = document.getElementById("inp_pname").value.trim();
  var customer_id = document.getElementById("inp_customerid").value;
  var width = 0;
  var height = 0;
  var inp_width = document.getElementById("inp_width");
  if (inp_width) {
    width = inp_width.value.trim();
  }

  var inp_height = document.getElementById("inp_height");
  if (inp_height) {
    height = inp_height.value.trim();
  }
  var titles = get_titles();
  var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

  
  jQuery.ajaxSetup(
              {
                cache: false
              });
              
  jQuery.post(link, {
      oid: option_id,
      cid: customer_id,
      pt: pt,
      w: width,
      h: height,
      t: JSON.stringify(titles),
      m: "getproductaccessories",
      site: "vlaggenactie"
    },
    function(data, status) {

      if (data) {
   
        var json = JSON.parse(data);
        if (json.length > 0) {
          var html = `<div class="jumbotron" id="div_label_99" style="clear:both;margin-bottom:10px !important;">Accessories<\/div>
											  <\/div>`;

          var image_str = "";

          var no_image = location.protocol + '//' + location.hostname + "/pub/media/geen.svg";
          html += `<div id="div_acs_remove" onclick="remove_all_acs(this)" 
												class="card col-sm-4 col-lg-4" 
													style="float:left;cursor:pointer;margin-bottom:5px;height:222px;background:url(` + no_image + `);background-repeat:no-repeat;background-position:center center;background-size:40% 40%">
										
											<div class="card-body" 
											style="width:100%;position:relative;bottom:0;text-align:center;margin-top:165px">
												 <h6 class="card-title" style="font-size:0.9em">Geen Accessories<\/h6>
                                            <\/div>
                                            <div class="checkedBox3">
                                                       <i class="fa fa-check text-right checkmark checkedBox" style="color:#f57f28; font-size: 15px;display:none"></i>
                                                </div>
											<\/div>`;


          for (var i = 0; i < json.length; i++) {
            var price = json[i].price;
            var acs_name = json[i].pname;
            var image = json[i].image;
            var id = json[i].id;
            var description = json[i].description;
            var acs_qty = json[i].qty;
            if (description == null) {
              description = "";
            }


            var screen_width = screen.width;
            var title_width = "width:180px";
            if (screen.width >= 1280) {
              title_width = "width:190px";
            }


            html += `<div class="card col-sm-4  col-lg-4 div_acss" style="position:relative;margin-bottom:5px" id="div_acs_` + id + `" data-img="` + image + `" 
                                                style="float:left;cursor:pointer;" >
                                                      
                                                    <div class="div_acs_top" onclick="show_qty(event,this,` + id + `)">
                                                        <div style="height:150px;width:100%">
                                                            <img src="` + image + `" />
                                                         </div>      
                                                        <div style="margin-top:10px">
                                                                        <h6 class="card-title" style="font-size:0.9em;color:rgb(0,65,97)">€ ` + parseFloat(price).toFixed(2) + ` per stuk</h6>
                                                                        <h6 class="card-title" style="font-size:0.9em">` + acs_name + `</h6>
                                                                        <p class="card-text" style="font-size:9px">` + description + `</p>
                                                        </div>
                                                               
                                                    </div>

                                                    <div class="div_asc_qty" id="div_acs_qty_` + id + `"  onclick="hide_qty(event,this,` + id + `)" style="position:absolute; margin-left:-50000px; height:232px;">
                                                        <div class="input-group" style="margin-top:75px">
                                                          <span class="input-group-btn">
                                                              <a style="height:35px;width:35px;line-height:26px;font-size:26px;color:white"  id="div_minus_` + id + `" class="btn btn-default btn-number"  data-type="minus" onclick="qty_minus(event,this,` + id + `)">
                                                                  -<span class="glyphicon glyphicon-minus"><\/span>
                                                              </a>
                                                          </span>
                                                          <input type="text" style="text-align:center" id="qty_` + id + `" class="form-control input-number"  value="` + acs_qty + `" min="` + acs_qty + `" max="1000">
                                                            <span class="input-group-btn">
                                                              <a  id="div_plus_` + id + `"  style="height:35px;width:35px;line-height:26px;font-size:26px;color:white" class="btn btn-default btn-number" onclick="qty_plus(event,this,` + id + `);return false;" >
                                                                  +<span class="glyphicon glyphicon-plus"></span>
                                                              </a>
                                                            </span>
                                                        </div>
                                                        <div style="margin-top:10px;position:absolute;bottom:10px">
                                                                        <h6 class="card-title" style="font-size:0.9em;color:rgb(0,65,97)">€ ` + parseFloat(price).toFixed(2) + ` per stuk</h6>
                                                                        <h6 class="card-title" style="font-size:0.9em">` + acs_name + `</h6>
                                                                        <p class="card-text" style="font-size:9px">` + description + `</p>
                                                        </div>

                                                    </div>

                                           			<div class="checkedBox3" onclick="show_qtyy(event,this,` + id + `)">
                                                       <i class="fa fa-check text-right checkmark checkedBox" style="color:#f57f28; font-size: 15px;display:none"></i>
                                                </div>	
                                              
                                            </div>`;
          }
          document.getElementById("div_product_accessories").innerHTML = html;


        }
      }
    });
}

function select_current(level, obj) {
  level = level - 1;
  if (level >= 0) {
    var div_content_el = document.getElementById("div_content_" + level);
    var cards = div_content_el.getElementsByClassName("card");
    if (cards.length > 0) {
      for (var i = 0; i < cards.length; i++) {
        cards.item(i).classList.remove("selected");
      }
      obj.classList.add("selected");
    }

  }

}

function select_current2(level, obj) {
  level = level - 1;
  if (level >= 0) {
    var div_content_el = document.getElementById("div_content_" + level);
    var cards = div_content_el.getElementsByClassName("card");
    if (cards.length > 0) {
      for (var i = 0; i < cards.length; i++) {
        cards.item(i).classList.remove("selected");
      }
      obj.parentElement.parentElement.classList.add("selected");
    }

  }

}

function add_to_array(array, level, opt_id) {
  level = level - 1;
  if (level == 0) {

  }
  if (level > 0) {

  }
}
var magentostorage;
document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(load, 500);

 
});

function closecart() {
  document.body.style.height = "auto";
  document.body.style.overflow = "none";

  var cart_button = document.getElementsByClassName("showcart").item(0);
  cart_button.click();
}

function show_prices()
{
     var mini_cart = document.getElementById("mini-cart");
      if (mini_cart)
      {
            var mini_cart_html = mini_cart.innerHTML;
            if (mini_cart_html.indexOf("media/pattern/loading.gif") !== -1)
            {
                update_price();
            }
            
      }
}

function openNav() 
{
    var customer_id = document.getElementById("inp_customerid").value;
    var data = "m=getcustomerquotedata&cid=" + customer_id;
    var lnk =   location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
          var response = this.responseText;
          var json = JSON.parse(response);
          var cart_count = json.cart_count;
          if (cart_count == 0)
          {
              if (document.getElementById("mini-cart"))
              {
                  document.getElementById("mini-cart").innerHTML = "Je hebt geen spullen in je winkelwagen";
                  document.getElementById("mini-cart").getElementsByClassName("subtotal").item(0).innerHTML = "";
                 
              }
          }
      }
    });
    
    xhr.open("POST", lnk);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    
    
    
  var mini_cart = document.getElementById("mini-cart");
  if (mini_cart)
  {
    
  }
  else
  {
    require('Magento_Customer/js/customer-data').reload(['cart'], false);
  
  }
  setTimeout(show_prices,1000);
  setTimeout(show_prices,3000);
  setTimeout(show_prices,6000);
  
  var lnk = window.location.href;
  
  
  document.body.style.height = "100%";
  document.body.style.overflow = "hidden";

  var header_item = document.getElementsByClassName("header-minicart");
  if (document.getElementById("btn_click_div2")) {
    document.getElementById("btn_click_div2").style.display = "none";
    document.getElementById("btn_click_div1").style.display = "block";
  }
  if (document.getElementById("btn_click_div20")) {
    document.getElementById("btn_click_div20").style.display = "none";
    document.getElementById("btn_click_div10").style.display = "block";
  }

  if (document.getElementById("btn_click_div21")) {
    document.getElementById("btn_click_div21").style.display = "none";
    document.getElementById("btn_click_div11").style.display = "block";
  }


  if (header_item.length > 0) {
    header_item = document.getElementsByClassName("header-minicart").item(0);
    var html = `<div style="float:left">
                    <span style="line-height: 3.2rem;font-size: 2rem;font-weight: 500;">Winkelwagen</span>
                </div>
               <div style="float: right;width:150px">
                    <button id="top-cart-btn-checkout2" type="button" style="float:left;margin-top:0px" class="button" style="background-color:#fff" onclick="goto_cart()">
                        <span>Bestellen</span>
                    </button>
                    <a class="closebtn" onclick="closecart()" style="float:right;cursor:pointer">X</a>
               </div>`;

    header_item.innerHTML = html;
  }


  var html2 = `<div class="flex flex-column mt-12">

                <div class="flex flex-column mb-12">
                    <button onclick="goto_cart()" id="top-cart-btn-checkout" type="button" class="btn btn-primary" data-action="close">Doorgaan met bestellen</button>
                    <button onclick="closecart()" class="btn btn-default" style="margin-top:10px;" id="btn-minicart-close2" data-action="close">Verder winkelen</button>
                </div>`;

      if (document.getElementById("mini-cart"))
    {
      html2 += `<div class="flex flex-row flex-justify-center flex-items-center">
                    <a id="top-cart-btn-empty-cart" style="text-decoration:underline;color:#4681ff !important;cursor:pointer" onclick="legen_cart()">Winkelwagen legen</a>
                    <span class="flex h-24 bg-gy-10 mr-16 ml-16" style="width: 1px;"></span>
                    <a id="top-cart-btn-save-cart" style="text-decoration:underline;color:#4681ff !important;cursor:pointer" onclick="bewaren_voor_later()">Bewaren voor later</a>
                </div>`;
    }
      html2 += `<div>
            </div>
          </div>`;

  if (document.getElementById("minicart-widgets")) 
  {
    
      document.getElementById("minicart-widgets").innerHTML = html2;
  }
    
 

  if (document.getElementById("top-cart-btn-checkout"))
  {
    document.getElementById("top-cart-btn-checkout").style.display = "block";
  }
  if (document.getElementById("btn-minicart-close2"))
  {
    document.getElementById("btn-minicart-close2").style.display = "block";
  }
  

  var width = document.body.clientWidth;
  var height = document.body.clientHeight;

  var modal_el = document.getElementById("div_top");






  modal_el.style.width = (width - 380) + "px";
  modal_el.style.height = height + "px";
  modal_el.style.backgroundColor = "#000";
  modal_el.style.opacity = "0.2";
  modal_el.style.position = "absolute";
  modal_el.style.top = "0";
  modal_el.style.left = "0";
  modal_el.style.zIndex = "99";



}

function closeNav() {
  document.body.style.overflow = "auto";


  var modal_el = document.getElementById("div_top");
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;

  modal_el.style.width = width + "px";
  modal_el.style.height = "0";
  modal_el.style.backgroundColor = "#000";
  modal_el.style.opacity = "1";
  modal_el.style.position = "absolute";
  modal_el.style.top = "0";
  modal_el.style.left = "0";
  modal_el.style.zIndex = "99";
}

function goto_cart() {
  window.location.href = location.protocol + '//' + location.hostname + '/checkout/#shipping';
}


function recalculate() {
  var side_table = document.getElementById("mini-cart2");
  if (side_table) {
    var items = side_table.getElementsByClassName("mini-cart-price");
    var grand_total = 0;

    for (var j = 0; j < items.length; j++) {
      var a_element = items.item(j).innerHTML;
      a_element = a_element.replace("€&nbsp;", "");
      a_element = parseFloat(a_element);

      grand_total += a_element;

    }
    document.getElementById("grand_total").innerHTML = "€ " + grand_total;
  } else {
    document.getElementById("grand_total").innerHTML = "€ 0";
  }

}
require([
  'jquery'
], function($) {
  jQuery(document).ready(function($) {
    setTimeout(function() {
      var x = jQuery(".header-categories").position();
      var left = x.left;
      document.getElementById("div_left_sidebar").style.left = left + "px";

    }, 100);
  });



});

function load() {
  if (document.getElementById("product_name")) {
    document.getElementById("product_name").innerHTML = document.getElementById("inp_pname2").value;


    var description = document.getElementById("inp_description").value.trim();
    var aanleveren = document.getElementById("inp_aanleveren").value.trim();
    var maximale_formaten = document.getElementById("inp_maximale_formaten").value.trim();
    var delivery_str = document.getElementById("inp_delivery_str").value;
    
    document.getElementById("work_dayy").innerHTML = delivery_str;
    

    document.getElementById("div_1").innerHTML = description;
    document.getElementById("div_2").innerHTML = aanleveren;
    document.getElementById("div_3").innerHTML = maximale_formaten;
  }


}

function select_accessories() {

  jQuery(".div_asc_top").css("position", "relative");
  jQuery(".div_asc_top").css("margin-left", "0");

  jQuery(".div_asc_qty").css("position", "absolute");
  jQuery(".div_asc_qty").css("margin-left", "-50000px");

  document.getElementById("div_acs_remove").classList.remove("selected");
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function qty_minus(event, obj, id) {
  if (amIclicked(event, obj)) {
    document.getElementById("div_other_prices").innerHTML = "";
    document.getElementById("div_product_quantity2").innerHTML = "";
    if (document.getElementById("product_options")) {
      document.getElementById("product_options").style.display = "none";
    }
    if (document.getElementById("div_product_buttons")) {
      document.getElementById("div_product_buttons").style.display = "none";
    }



  }
}

function qty_plus(event, obj, id) {
  if (amIclicked(event, obj)) {
    document.getElementById("div_other_prices").innerHTML = "";
    document.getElementById("div_product_quantity2").innerHTML = "";
    if (document.getElementById("product_options")) {
      document.getElementById("product_options").style.display = "none";
    }
    if (document.getElementById("div_product_buttons")) {
      document.getElementById("div_product_buttons").style.display = "none";
    }


  }
}

function calculate_table() {
  var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
  console.log(timeStampInMs);

  var link = window.location.origin;
  document.getElementById("div_product_quantity2").innerHTML = '<img style="width:30px" src="' + link + '/pub/media/materialprice/media/pattern/loading.gif" />';
  document.getElementById("div_other_prices").innerHTML = "";
  document.getElementById("div_panel").style.display = "none";


  var arr = [];
  var pname = document.getElementById("inp_pname").value;
  var knm = 0;
  for (var i = 0; i < 30; i++) {


    var content_id = "div_content_" + i;
    var label_id   = "div_label_" + i;
    var label_display = "";

    if (document.getElementById(label_id))
    {
      label_display = document.getElementById(label_id).style.display;
    }

    if (document.getElementById(content_id) && label_display == "block")

    {
      var cards = document.getElementById(content_id).getElementsByClassName("card");
      if (cards.length == 0) {
        var width = 0;
        var height = 0;
        var amount = 1;
        
          if (document.getElementById("inp_width"))
          {
            width = document.getElementById("inp_width").value;
          }
           if (document.getElementById("inp_height"))
          {
            height = document.getElementById("inp_height").value;
          }
          if (document.getElementById("inp_amount"))
          {
            amount = document.getElementById("inp_amount").value;
          }
          
        
    

          var new_arr = new Object();
          new_arr.pname = pname;
          new_arr.level = i;
          new_arr.opt_id = "";
          new_arr.value1 = width;
          new_arr.value2 = height;
          new_arr.value3 = amount;
          new_arr.value4 = ""; 
          new_arr.value5 = "";

          arr.push(new_arr);
          knm = i;

   
        
        
      } else {
        var selected_item = document.getElementById(content_id).getElementsByClassName("selected")
        if (selected_item.length > 0) {
          selected_item = selected_item.item(0);
          var onclick_str = selected_item.getAttribute("onclick");

          if (onclick_str) {
            var splitt = onclick_str.split(",");
            var selected_id = splitt[2];
            
            
            var selected_knm = splitt[6];
            
            var label_left_str = "";
            var label_right_str = "";
            if (document.getElementById("a_text2_" + i))
            {
                label_left_str = document.getElementById("a_text2_" + i).innerText;
                label_right_str = document.getElementById("a_text_" + i).innerText;
            }
      
             
              
              

            var new_arr = new Object();
            new_arr.pname = pname;
            new_arr.level = i;
            new_arr.opt_id = selected_id;
            new_arr.value1 = "";
            new_arr.value2 = "";
            new_arr.value3 = "";
            new_arr.value4 = label_left_str;
            new_arr.value5 = label_right_str;

            arr.push(new_arr);
            knm = i;
          } else {
            var button_count = selected_item.getElementsByTagName("button").length;
            if (button_count > 0) {
              var button_element = selected_item.getElementsByTagName("button").item(0);
              var inp_element = selected_item.getElementsByTagName("input").item(0);
              var button_onclick_str = button_element.getAttribute("onclick");

              var splitt = button_onclick_str.split(",");
              var selected_id = splitt[3];
              
              var selected_knm = splitt[6];
              
              var label_left_str = "";
              var label_right_str = "";
              
              if (document.getElementById("a_text2_" + i))
              {
                    label_left_str = document.getElementById("a_text2_" + i).innerText;
                    label_right_str = document.getElementById("a_text_" + i).innerText;
              }
              

              var new_arr = new Object();
              new_arr.pname = pname;
              new_arr.level = i;
              new_arr.opt_id = selected_id;
              new_arr.value1 = inp_element.value.trim();
              new_arr.value2 = "";
              new_arr.value3 = "";
              new_arr.value4 = label_left_str;
              new_arr.value5 = label_right_str;

              arr.push(new_arr);
              knm = i;


            }
          }

        }
      }

      var accessories_divs = document.getElementById("div_product_accessories").getElementsByClassName("selected");
      if (accessories_divs.length > 0) {
        for (var j = 0; j < accessories_divs.length; j++) {
          var option_id = accessories_divs.item(j).id;
          option_id = option_id.replace("div_acs_", "");

          var input = accessories_divs.item(j).getElementsByTagName("input");
          if (input.length > 0) {
            var input_value = accessories_divs.item(j).getElementsByTagName("input").item(0).value.trim();
            var new_arr = new Object();
            new_arr.pname = pname;
            new_arr.level = knm + 1;
            new_arr.opt_id = option_id;
            new_arr.value1 = input_value;
            new_arr.value2 = "acs";
            new_arr.value3 = "";
            new_arr.value4 = "";
            new_arr.value5 = "";

            arr.push(new_arr);
          }
        }

      }

    }
  }


  var new_arr = new Object();
  new_arr.json = arr;
  new_arr.productname = document.getElementById("inp_pname").value.trim();
  new_arr.productid = document.getElementById("inp_pid").value.trim();
  new_arr.customerid = document.getElementById("inp_customerid").value.trim();
  new_arr.customeremail = document.getElementById("inp_customeremail").value.trim();


  var myJsonString = JSON.stringify(new_arr);
  console.log(myJsonString);

  

  var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);

  var posted_data = "m=getpricetable&data=" + myJsonString;

  document.getElementById("inp_jsonstring").value = myJsonString;
  jQuery.ajaxSetup(
              {
                cache: false
              });
              
  jQuery.post(link, {
      m: "getpricetablemainnew2",
      dat: myJsonString,
      site: "vlaggenactie",
      customeremail: document.getElementById("inp_customeremail").value.trim(),
      customerid: document.getElementById("inp_customerid").value.trim(),
      productid: document.getElementById("inp_pid").value.trim(),
      producttype: document.getElementById("inp_pname2").value.trim()
      
    },
    function(data, status) {
      if (data) {
          console.log(data);
        if (data.indexOf("{") !== -1)
        {
          data = data.substring(data.indexOf("{"), data.length);
        }
        data = JSON.parse(data);
        var stat = data.stat;
        if (stat == 'fail') {
          //alert(data.msg);
        } else {

          document.getElementById("div_product_quantity2").innerHTML = "";
          document.getElementById("div_other_prices").innerHTML = "";
          document.getElementById("div_panel").innerHTML = "";

          received_data = data;


        
          
            fill_tablee3(data);
            document.getElementById("div_product_quantity2").style.display = "block";
            if (document.getElementById('price_table')) {
              document.getElementById('price_table').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
              });
            }
         


        }

      }
    });



}




function amIclicked(e, element) {
  //select_accessories();
  e = e || event;
  var target = e.target || e.srcElement;


  if (target.id.indexOf("div_plus_") !== -1 || element.id.indexOf("div_plus_") !== -1) {
    var qty_el = "";
    if (target.id.length > 0) {
      qty_el = target.id.replace("div_plus_", "qty_");
    }
    if (element.id.length > 0) {
      qty_el = element.id.replace("div_plus_", "qty_");
    }
    var qty_el2 = qty_el.replace("qty_", "");
   // console.log("+++++++div_acs_" + qty_el2);

    var acs_str = "";
    if (qty_el2.indexOf("div_acs_") == -1) {
      acs_str = "div_acs_" + qty_el2;
    } else {
      acs_str = qty_el2;
    }




    qty_el = qty_el.replace("div_acs_", "qty_");


    if (qty_el.indexOf("qty_qty") == -1) {
     // console.log("-----" + qty_el);
      var deg1 = document.getElementById(qty_el).value.trim();
      if (deg1.length == 0) {
        deg1 = "0";
      }
      var deg = parseInt(deg1);
      deg = deg + 1;
      document.getElementById(qty_el).value = deg;
    }



    //setTimeout(calculate_table,200);
    document.getElementById("btn_go_on").style.display = "inline-block";
    document.getElementById("btn_show_options").style.display = "none";
  }
  if (target.id.indexOf("div_minus_") !== -1 || element.id.indexOf("div_minus_") !== -1) {
    var qty_el = "";
    if (target.id.length > 0) {
      qty_el = target.id.replace("div_minus_", "qty_");
    }
    if (element.id.length > 0) {
      qty_el = element.id.replace("div_minus_", "qty_");
    }
    var qty_el2 = qty_el.replace("qty_", "");
    console.log("+++++++div_acs_" + qty_el2);

    var acs_str = "";
    if (qty_el2.indexOf("div_acs_") == -1) {
      acs_str = "div_acs_" + qty_el2;
    } else {
      acs_str = qty_el2;
    }

    if (qty_el.indexOf("div_acs_div_acs") == -1) {
      var deg1 = document.getElementById(qty_el).value.trim();
      if (deg1.length == 0) {
        deg1 = "0";
      }
      var deg = parseInt(deg1);
      deg = deg - 1;
      if (deg >= 0) {
        document.getElementById(qty_el).value = deg;


        //setTimeout(calculate_table,200);
        document.getElementById("btn_go_on").style.display = "inline-block";
        document.getElementById("btn_show_options").style.display = "none";
      }
    }

  }
  if (target.id == element.id)
    return true;
  else
    return false;
}

function show_qty(event, obj, id) {


  if (amIclicked(event, obj)) {
    document.getElementById("div_other_prices").innerHTML = "";
    document.getElementById("div_product_quantity2").innerHTML = "";
    if (document.getElementById("product_options")) {
      document.getElementById("product_options").style.display = "none";
    }
    if (document.getElementById("div_product_buttons")) {
      document.getElementById("div_product_buttons").style.display = "none";
    }




    jQuery("#div_acs_qty_" + id).css("position", "relative");
    jQuery("#div_acs_qty_" + id).css("margin-left", "0");

    obj.style.position = "absolute";
    obj.style.marginLeft = "-50000px";

    document.getElementById("div_acs_" + id).className = "card col-sm-4 col-lg-4 div_acss selected";

    document.getElementById("div_acs_remove").className = "card col-sm-4 col-lg-4";

    //document.getElementById("div_product_quantity2").innerHTML = '<img style="width:30px" src="https:///pub/media/materialprice/media/pattern/loading.gif" />';
    //setTimeout(select_accessories,100);
    //setTimeout(calculate_table,200);
    document.getElementById("btn_go_on").style.display = "inline-block";
    document.getElementById("btn_show_options").style.display = "none";

  }
}

function show_qtyy(event, obj, id) {
  document.getElementById("div_other_prices").innerHTML = "";
  document.getElementById("div_product_quantity2").innerHTML = "";
  if (document.getElementById("product_options")) {
    document.getElementById("product_options").style.display = "none";
  }
  if (document.getElementById("div_product_buttons")) {
    document.getElementById("div_product_buttons").style.display = "none";
  }

  jQuery("#div_acs_qty_" + id).css("position", "relative");
  jQuery("#div_acs_qty_" + id).css("margin-left", "0");

  document.getElementById("div_acs_" + id).getElementsByClassName("div_acs_top").item(0).style.position = "absolute";
  document.getElementById("div_acs_" + id).getElementsByClassName("div_acs_top").item(0).style.marginLeft = "-50000px";
  document.getElementById("div_acs_" + id).className = "card col-sm-4 col-lg-4 div_acss selected";


  //document.getElementById("div_product_quantity2").innerHTML = '<img style="width:30px" src="https:///pub/media/materialprice/media/pattern/loading.gif" />';
  //setTimeout(select_accessories,100);
  //setTimeout(calculate_table,200);
  document.getElementById("btn_go_on").style.display = "inline-block";
  document.getElementById("btn_show_options").style.display = "none";

  document.getElementById("div_acs_remove").className = "card col-sm-4 col-lg-4";

  obj.removeAttribute("onclick");
  obj.setAttribute("onclick", "hide_qtyy(event,this," + id + ")");


}

function click_qty() {
  var amount = parseInt(document.getElementById("inp_amount").value.trim());

  if (amount == 0 || amount.length == 0 || Number.isNaN(amount)) {
    amount = 1;
  }
  var tr_element = document.getElementById("tr_" + amount);
  if (tr_element) {
    var td_element = tr_element.getElementsByTagName("td").item(0);
    td_element.click();
  }

}


function fill_tablee3(data) {
  console.log(data);

  if (data == undefined) {
    //alert("I cant get the price table from server. Please check the file you have uploaded in admin panel");
  }


  var days_dizi = new Array();
  tax = document.getElementById("inp_tax").value;
  //var json = JSON.parse(data);
  var json = data;
  var days = json.days;
  var prices = json.prices;
  var day_definition = json.day_definition;
  day_definition_arr = day_definition;

  var url = new URL(window.location);
  var c = url.searchParams.get("type");


  if (c == 'sameday') {
    days = "0|sameday";
  } else {

    var day_arr2 = days.split(",");
    days = "";
    for (var j = 0; j < day_arr2.length; j++) {
      var dayy2 = day_arr2[j];
      var dayy_num = dayy2.split("|")[0];
      if (dayy_num !== "0") {
        days += dayy2 + ",";
      }

    }



  }
  days = days.substring(0, days.length - 1);


  var html = "";
  if (prices) {
    html = `
        <table id="price_table" class="table table-hover table-bordered">
           <tbody id="price_tbody">
              <tr class="d-flex justify-content-between" style="line-height:15px">
                 <th style="font-weight: normal; text-align: left;">
                    <b>Oplage <br> per ontwerp</b>
                 <\/th>
                 `;
    var day_arr = days.split(",");
    day_arr = day_arr[day_arr.length - 1];


    var day_text = "";


    var dayy = day_arr.split("|")[0];
    dayy = parseInt(dayy);
    days_dizi.push(dayy);
    var dayy2 = dayy;
    var day_style = day_arr.split("|")[1];

    var day_html = "";




    var day_stylee = "";
    var day_text = "";



    if (day_style == 'sameday') {
      day_stylee = 'DeliverySameDay';
      day_text = 'sameday';
    }
    if (day_style == 'normaal') {
      day_stylee = 'DeliveryStandard';
      day_text = 'Normaal levering';
    }
    if (day_style == 'express') {
      day_stylee = 'DeliveryExpress';
      day_text = 'Express levering';
    }
    if (day_style == 'nextday') {
      day_stylee = 'DeliveryNextDay';
      day_text = 'Next-day';
    }
    day_style = "budget";
    if (day_style == 'budget') {
      day_stylee = 'Budget';
      day_text = 'Budget levering';
    }
    if (day_stylee == '') {
      //day_style == 'normale';
      day_stylee = 'DeliveryStandard';
      day_text = day_style;
    }




// var day_cal = get_date(dayy);
//    var day = day_cal.day;
//    var month = day_cal.month_name;
//    var day_textt = day_cal.day_name;



    var day_count = "";
    if (dayy2 === 0) {
      day_count = "sameday";
    } else {
      day_count = dayy2 + " Productiedagen";
    }
    //day_text = "sameday";

   /* day_html = `
                 <div class="Island Label Label--Delivery  Label--` + day_stylee + `">` + day_text + `<\/div>
                 <time datetime="16-05-2018">
                    <div style=';
                       background: 0;
                       text-align: center;
                       font-size: .875em;
                       font-weight: 400;'>` + day_textt + `<\/div>
                    <div class="Island Island--Half">
                       <span class="DeliveryDay">` + day + `<\/span>
                       <span class="DeliveryMonth">` + month + `<\/span>
                    <\/div>
                 <\/time>
                 `;*/


    //html += `<th style="font-weight: normal; text-align: right;"><b><span style="color: #f57f28">` + day_text + ` </span><br> ` + day_textt + ` <br> ` + day + ` ` + month + `</b></th>`;
    html += `<th style="font-weight: normal; text-align: right;"></th>`;

    html += `
              <\/tr>`;
    for (var i = 0; i < prices.length; i++) {
      var o_qty = prices[i].adet;
   

      var min_price = parseFloat(get_min_price(prices[i]));
      var min_day = parseFloat(get_min_day(prices[i]));  


 


      //var ele = is_showable(o_qty);
      var ele = 'block';
      html += `
              <tr class="d-flex justify-content-between" style="line-height: 24px;height:40px" id="tr_` + o_qty + `">
                 `;



  

     
        var with_tax = min_price * (100 + parseFloat(tax)) / 100;
        var total = min_price;
        if (total > 0) {
          html += `<td class="price_table_td" style="width:40%" id="tdd_` + min_day + "_" + o_qty + `" total="` + total + `" onclick="select_price2(` + min_day + `,` + o_qty + `,this)"><a>` + o_qty + `<\/a><\/td>
                 
                              <td class="price_table_td2" style="width:60%"  id="td_` + min_day + "_" + o_qty + `" total="` + total + `" onclick="select_price2(` + min_day + `,` + o_qty + `,this)">
                 <div class="div_0">€ ` + convert_number(total) + ` excl.btw<\/div>
                 <div class="div_1">€ ` + convert_number(with_tax) + ` incl.btw<\/div>   
                 <\/td>`;
        } else {
          var img_link = location.protocol + '//' + location.hostname + '/media/wysiwyg/matrixprice/icon_call_for_the_price.svg';
          html += `<td style="width:40%"><a>` + o_qty + `</a></td>`;
          html += `<td style="width:60%" id="td_` + min_day + `_` + o_qty + `" total="` + total + `"><img src="` + img_link + `" height="40" /><\/td>`;
        }
   
      html += `
              <\/tr>
              `;


    }
    html += `      <tr id="trr_oplage" class="d-flex justify-content-between">
                 <td style="font-weight: normal; text-align: left;width:40%">
                 <input autocomplete="off" style='text-align:center;width:60px;border-radius' placeholder="Oplage" type="number" name="qty" 
                 
                 id="price_qty" onkeyup="searchQty()" maxlength="12" value="" title="Aantal" class="input-text qty validation-passed"><\/td>
                 <td  style="padding: 4px;cursor: pointer;width:60%"><span class="handmatig-aantallen">indien uw gewenste aantallen er niet tussen staat, kunt u deze hier zelf invoeren<\/span><\/td>
              <\/tr>
           <\/tbody>
        <\/table>
        `;

    //console.log(html);
    var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    //console.log(timeStampInMs);

  } else {
    html = "<h1>There is no price setted for your account. Please talk to your sales manager<\/h1>";
  }
  document.getElementById("div_product_quantity2").innerHTML = html;
  setTimeout(click_qty, 300);

}

function get_min_day(prices)
{
    var min_price = 0;
    var prics = new Array();
    for (var i = 0;i < 30;i++)
    {
        if (prices["price_" + i] !== undefined)
        {
            prics.push(i);
        }
    }
    
    min_day = Math.max.apply(Math, prics);
    
    return min_day;
}

function get_min_price(prices)
{
    var min_price = 0;
    var prics = new Array();
    for (var i = 0;i < 30;i++)
    {
        if (prices["price_" + i] !== undefined)
        {
            prics.push(prices["price_" + i]);
        }
    }
    
    min_price = Math.min.apply(Math, prics);
    
    return min_price;
}




function hide_qtyy(event, obj, id) {


  if (amIclicked(event, obj)) {
    document.getElementById("div_other_prices").innerHTML = "";
    document.getElementById("div_product_quantity2").innerHTML = "";
    if (document.getElementById("product_options")) {
      document.getElementById("product_options").style.display = "none";
    }
    if (document.getElementById("div_product_buttons")) {
      document.getElementById("div_product_buttons").style.display = "none";
    }

    jQuery("#div_acs_qty_" + id).css("position", "absolute");
    jQuery("#div_acs_qty_" + id).css("margin-left", "-50000px");

    document.getElementById("div_acs_" + id).getElementsByClassName("div_acs_top").item(0).style.position = "relative";
    document.getElementById("div_acs_" + id).getElementsByClassName("div_acs_top").item(0).style.marginLeft = "0";

    obj.removeAttribute("onclick");
    obj.setAttribute("onclick", "show_qtyy(event,this," + id + ")");
    document.getElementById("div_acs_" + id).className = "card col-sm-4 col-lg-4 div_acss";

    //document.getElementById("div_product_quantity2").innerHTML = '<img style="width:30px" src="https:// /pub/media/materialprice/media/pattern/loading.gif" />';
    //setTimeout(calculate_table,200);
    document.getElementById("btn_go_on").style.display = "inline-block";
    document.getElementById("btn_show_options").style.display = "none";

    //select_accessories();       
  }
}

function hide_qty(event, obj, id) {


  if (amIclicked(event, obj)) {
    document.getElementById("div_other_prices").innerHTML = "";
    document.getElementById("div_product_quantity2").innerHTML = "";
    if (document.getElementById("product_options")) {
      document.getElementById("product_options").style.display = "none";
    }
    if (document.getElementById("div_product_buttons")) {
      document.getElementById("div_product_buttons").style.display = "none";
    }

    jQuery("#div_acs_qty_" + id).css("position", "absolute");
    jQuery("#div_acs_qty_" + id).css("margin-left", "-50000px");

    document.getElementById("div_acs_" + id).getElementsByClassName("div_acs_top").item(0).style.position = "relative";
    document.getElementById("div_acs_" + id).getElementsByClassName("div_acs_top").item(0).style.marginLeft = "0";



    document.getElementById("div_acs_" + id).className = "card col-sm-4 col-lg-4 div_acss";

    //document.getElementById("div_product_quantity2").innerHTML = '<img style="width:30px" src="https:// /pub/media/materialprice/media/pattern/loading.gif" />';
    //setTimeout(calculate_table,200);
    document.getElementById("btn_go_on").style.display = "inline-block";
    document.getElementById("btn_show_options").style.display = "none";
    //select_accessories();		
  }
}

function num_control20()
{
  var qty = document.getElementById("inp_amount2").value.trim();
  if (qty.length == 0)
  {
    qty = 1;
  }
  var qty_element = document.getElementById("qty");
  qty_element.value = qty;
}


function num_control(obj, optionsarray, level, id, id2, son, obj, a1, a2) {
  var numparent = obj.parentElement;
  var num_parent_value = numparent.getElementsByTagName("input").item(0).value.trim();
  if (num_parent_value.length > 0) {
    var knm = level - 1;
    var par_element = obj.parentElement.parentElement;
    var card_title = par_element.getElementsByClassName("card-title").item(0).innerHTML;

    document.getElementById("a_text_" + knm).innerHTML = card_title + " : " + num_parent_value;
    get_opt(optionsarray, level, id, id2, son, obj, a1, a2);
  } else {
    alert("you must enter a value");
    document.getElementById("div_product_accessories").innerHTML = "";
  }
}
async function resize_heights(level) {
  var content = document.getElementById("div_content_" + level);
  var cards = content.getElementsByClassName("card");
  var hei = new Array();
  for (var i = 0; i < cards.length; i++) {
    var card = content.getElementsByClassName("card").item(i);
    let delayres = await delay(50);
    var height = jQuery(".card-body").height();
    var image_count = card.getElementsByTagName("img").length;

    const img = new Image();
    img.onload = function() {
      height = jQuery(".card-body").height() + this.height;
      hei.push(height + 20);
    }
    img.src = card.getElementsByTagName("img").item(0).src;


    var button_count = card.getElementsByTagName("button").length;
    if (button_count > 0) {

      hei.push(height + 50);
    }
  }

  var max_of_array = Math.max.apply(Math, hei);
  for (var i = 0; i < cards.length; i++) {
    var card = content.getElementsByClassName("card").item(i);
    card.style.height = max_of_array + "px";

  }



}

async function slide_accordion(id) {
  let delayres = await delay(500);
  var element = "div_" + id;
  jQuery('html, body').animate({
    scrollTop: jQuery("#" + element).offset().top - 150
  }, 1000);



}

async function slide_selected(level, son) {
  let delayres = await delay(1000);
  if (son == 0) {
    var element = "div_label_" + (level + 1);

    if (document.getElementById("div_label_" + (level + 1))) 
    {
      //document.getElementById(element).scrollIntoView();
      
      
      /*jQuery('html, body').animate({
        scrollTop: jQuery("#" + element).offset().top - 150
      }, 1000);*/
       
      
    } else {
      slide_selected(level, son);
    }


  }

}

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

function recalculate2() {
  document.getElementById('price_table').scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  });
  document.getElementById("btn_show_options").style.display = "none";
  document.getElementById("btn_go_on").style.display = "none";
  calculate_table();

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function num_control2() {
  var amount_element = document.getElementById("inp_amount");
  var width_element = document.getElementById("inp_width");
  var height_element = document.getElementById("inp_height");

  if (amount_element.value.trim().length > 0) {
    if (document.getElementById("price_table")) {
      
      if (document.getElementById("div_under_aantal"))
      {
        document.getElementById("div_under_aantal").style.display = "block";
      }
      
      
      jQuery("#div_content_0 .input-group").attr('class', 'input-group afmeting_group_size');
    } else {

    }

  } else {

    jQuery("#div_content_0 .input-group").attr('class', 'input-group col-lg-4 col-sm-4');
    if (document.getElementById("div_under_aantal"))
    {
      document.getElementById("div_under_aantal").style.display = "none";
    }
    
  }
  if (width_element) {
    if (width_element.value.trim().length > 0) {
      if (document.getElementById("price_table")) {
        
        if (document.getElementById("div_under_aantal"))
        {
          document.getElementById("div_under_aantal").style.display = "block";
        }
        jQuery("#div_content_0 .input-group").attr('class', 'input-group afmeting_group_size');
      }


    } else {

      jQuery("#div_content_0 .input-group").attr('class', 'input-group col-lg-4 col-sm-4');
      if (document.getElementById("div_under_aantal"))
      {
        document.getElementById("div_under_aantal").style.display = "none";
      }
      
    }
  }
  if (height_element) {
    if (height_element.value.trim().length > 0) {
      if (document.getElementById("price_table")) {
        document.getElementById("div_under_aantal").style.display = "block";
        jQuery("#div_content_0 .input-group").attr('class', 'input-group afmeting_group_size');

      }


    } else {
      jQuery("#div_content_0 .input-group").attr('class', 'input-group col-lg-4 col-sm-4');

      document.getElementById("div_under_aantal").style.display = "none";
    }
  }


}

require(['jquery'], function($) {
  $(document).ready(function() {
    $("#price_table tbody tr th").css("font-weight", "normal");
    $("#price_table tbody tr th:even").css("text-align", "left");
    $("#price_table tbody tr th:odd").css("text-align", "right");



  });
});

resize_gallery();

function resize_gallery() {
  require(['jquery'], function($) {
    var width = jQuery(".fotorama-item").width();
    width = parseInt(width / 1.5);
    if (width == 0) {
      setTimeout(resize_gallery, 200);
    } else {
      jQuery(".fotorama__stage").css("height", width + "px");
    }
  });
}




function show_down(level) {
  if (document.getElementById("a_up_" + level)) {
    document.getElementById("a_up_" + level).style.display = "none";
    document.getElementById("a_down_" + level).style.display = "block";
    document.getElementById("div_content_" + level).style.display = "none";
  }

}

function show_up(level) {
  if (document.getElementById("a_up_" + level)) {
    document.getElementById("a_down_" + level).style.display = "none";
    document.getElementById("a_up_" + level).style.display = "block";
    document.getElementById("div_content_" + level).style.display = "block";
  }

}

function get_address_by_post_code_(num) {
  var item_name = "";
  var house_name = "";
  var handmatig_element = "";
  var address_element = "";
  
  var street_element = "";
  var city_element = "";
  
  if (num == 0) {
    item_name = "item_postalcode";
    house_name = "item_housenumber";
    handmatig_element = "div_handmatig";
    address_element = "a_address";
    street_element  = "item_street"; 
    city_element = "item_city";
  }
  if (num == 2) {
    item_name = "item_postalcode2";
    house_name = "item_housenumber2";
    handmatig_element = "div_handmatig2";
    address_element = "a_address2";
    street_element  = "item_street2"; 
    city_element = "item_city2";

  }
  if (num == 3) {
    item_name = "item_postalcode3";
    house_name = "item_housenumber3";
    handmatig_element = "div_handmatig3";
    address_element = "a_address3";
    street_element  = "item_street3"; 
    city_element = "item_city3";

  }
  if (num == 6) {
    item_name = "item_postalcode6";
    house_name = "item_housenumber6";
    handmatig_element = "div_handmatig6";
    address_element = "a_address6";
    street_element  = "item_street6";
    city_element = "item_city6";

  }

  if (num == 7) {
    item_name = "item_postalcode7";
    house_name = "item_housenumber7";
    handmatig_element = "div_handmatig7";
    address_element = "a_address7";
    street_element  = "item_street7";
    city_element = "item_city7";

  }
  if (num == 8) {
    item_name = "item_postalcode8";
    house_name = "item_housenumber8";
    handmatig_element = "div_handmatig8";
    address_element = "a_address8";
    street_element  = "item_street8";
    city_element = "item_city8";

  }
  if (num == 9) {
    item_name         = "customer_new_item_postalcode";
    house_name        = "customer_new_item_housenumber";
    handmatig_element = "customer_new_div_handmatig";
    address_element   = "customer_new_a_address";
    street_element  = "customer_new_item_street"; 
    city_element = "customer_new_item_city";

  }
  if (num == 10) 
  {
    item_name         = "customer_edit_item_postalcode";
    house_name        = "customer_edit_item_housenumber";
    handmatig_element = "customer_edit_div_handmatig";
    address_element   = "customer_edit_a_address";
    street_element  = "customer_edit_item_street"; 
    city_element = "customer_edit_item_city";

  }
  if (num == 11) 
  {
    item_name         = "sales_edit_item_postalcode";
    house_name        = "sales_edit_item_housenumber";
    handmatig_element = "sales_edit_div_handmatig";
    address_element   = "sales_edit_a_address";
    street_element  = "sales_edit_item_street"; 
    city_element = "sales_edit_item_city";

  }
  if (document.getElementById(street_element))
  {
    document.getElementById(street_element).value = "";
  }
  
   if (document.getElementById(city_element))
  {
    document.getElementById(city_element).value = "";
  }

  document.getElementById(address_element).innerHTML = "";
  //document.getElementById(handmatig_element).style.display = "none";

  var postcode = document.getElementById(item_name).value.trim();
  var house_number = document.getElementById(house_name).value.trim();
  postcode = postcode.replace(/ /g, '');
  if (postcode.length > 3 && house_number.length > 0) {
    
    var res = get_address_by_post_code(postcode, num);
    if (res == "ok")
    {
      document.getElementById(handmatig_element).style.display = "none";
      document.getElementById(address_element).style.display = "block";
    }
    else
    {
      document.getElementById(handmatig_element).style.display = "block";
      document.getElementById(address_element).style.display = "none";
    }
    
    
  } else {
    document.getElementById(handmatig_element).style.display = "block";
    document.getElementById(address_element).style.display = "none";
  }


}

/*function placeOrder() {
  if (document.getElementsByClassName("payment-method _active")) {
      var active_el = document.getElementsByClassName("payment-method _active").item(0);
      active_el = active_el.getElementsByClassName("action primary checkout").item(0);
      active_el.click();

  } else {
    alert("select payment method");
  }

}*/

function placeOrder() 
{
    var notuploaded_count = document.getElementsByClassName("notuploaded").length;
    if (notuploaded_count > 0)
    {
        alert("upload uw bestand");
    }
    else
    {
        if (document.getElementsByClassName("payment-method _active")) 
        {
            set_payment_price();
            setTimeout(function()
                                {
                                    var active_el = document.getElementsByClassName("payment-method _active").item(0);
                                    active_el = active_el.getElementsByClassName("action primary checkout").item(0);
                                    active_el.click();
                                },2000);
            
            
        } 
        else 
        {
            alert("select payment method");
        }
    }
}



var addresses = [];

function parse_addresses() {
  var shipping_address_items = document.getElementsByClassName("shipping-address-item");
  if (shipping_address_items.length > 0) {

    document.getElementById("ontvager_step1").style.display = "none";
    document.getElementById("ontvager_step2").style.display = "block";

    addresses = [];

    for (var i = 0; i < shipping_address_items.length; i++) {
      var item = shipping_address_items.item(i);
      var cls = item.className;
      var item_html = item.innerHTML;
      
      item_html = item_html.replace(/<!-- /gi, "<");
    

      item_html = item_html.replace(/ --/gi, "");


      var prefix = get_address_value("prefix", item_html);
      var firstname = get_address_value("firstname", item_html);
      var middlename = get_address_value("middlename", item_html);
      var lastname = get_address_value("lastname", item_html);
      var company = get_address_value("company", item_html);
      var suffix = get_address_value("suffix", item_html);
      var street = get_address_value("street", item_html);
      var region = get_address_value("region", item_html);


      var city = get_address_value("city", item_html);
      var postcode = get_address_value("postcode", item_html);
      var countryId = get_address_value("countryId", item_html);
      var telephone = get_address_value("telephone", item_html);

      

      var customerAddressId = get_address_value("customerAddressId", item_html);
      var house_number = get_house_number(customerAddressId);
      var toevoeging   = get_toevoeging(customerAddressId);


      const shipping_address = {
        knm: i,
        cls: cls,
        region: region,
        prefix: prefix,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        company: company,
        suffix: suffix,
        street: street,
        city: city,
        postcode: postcode,
        countryId: countryId,
        telephone: telephone,
        house_number: house_number,
        toevoeging: toevoeging
      };


      addresses.push(shipping_address);
    }
    console.log(addresses);
  } else {
    document.getElementById("ontvager_step2").style.position = "absolute";
    document.getElementById("ontvager_step2").style.left = "-50000px";

    document.getElementById("checkout-step-shipping").style.position = "relative";
    document.getElementById("checkout-step-shipping").style.left = "0";
    document.getElementById("checkout-step-shipping").style.display = "block";


    var authorization_link = document.getElementsByClassName("authorization-link").item(0);
    var authorization_link_html = authorization_link.innerHTML;
    if (authorization_link_html.indexOf("Sign In") !== -1) {
      if (document.getElementById("customer-email-fieldset"))
      {
         document.getElementById("customer-email-fieldset").style.position = "relative";
        document.getElementById("customer-email-fieldset").style.left = "0";
        document.getElementById("customer-email-fieldset").style.display = "block";
      }
     
      if (document.getElementById("shipping-new-address-form"))
      {
        document.getElementById("shipping-new-address-form").style.position = "absolute";
        document.getElementById("shipping-new-address-form").style.left = "-50000px";
      }
      
    } 
    else 
    {

    }




  }

}
function get_house_number(address_id)
{
    var house_numbers = document.getElementById("inp_housenumbers").value;
    house_numbers = house_numbers.replace(/'/g, '"');

    var output = "";
    var json = JSON.parse(house_numbers);
    for (var i = 0;i <  json.length;i++)
    {
      var active = json[i];
      var entity_id     = active["entity_id"];
      var house_number  = active["house_number"];

      if (entity_id == address_id)
      {
          output = house_number;
      }

    }
    return output;
}

function get_toevoeging(address_id)
{
    var house_numbers = document.getElementById("inp_housenumbers").value;
    house_numbers = house_numbers.replace(/'/g, '"');

    var output = "";
    var json = JSON.parse(house_numbers);
    for (var i = 0;i <  json.length;i++)
    {
      var active = json[i];
      var entity_id     = active["entity_id"];
      var toevoeging  = active["toevoeging"];

      if (entity_id == address_id)
      {
          output = toevoeging;
      }

    }
    return output;
}




function emailavailable() {
  console.log("email ok");
}

function login_success() {
  console.log("login success");
}



function get_address_value(srch, source) {
  if (srch == "street" || srch == "countryId") {
    srch = "address()." + srch;
  } else {
    srch = "text: address()." + srch;
  }


  var index = source.indexOf(srch);
  var result = source.substring(index + srch.length, source.length);
  index = result.indexOf("<");
  result = result.substring(0, index);
  result = result.split(">")[1];
  return result;


}

function new_address() {
  var modal = document.getElementById("myModal6");
  var iti__selected_flag = modal.getElementsByClassName("iti__selected-flag");
  if (iti__selected_flag.length > 0)
  {
    iti__selected_flag = iti__selected_flag.item(0);
    var title = iti__selected_flag.getAttribute("title");
    title = title.split("(");
    title = title[0];
    title = title.trim();
    
    title = title.split(":")[0];
    title = title.trim();

    document.getElementById("countryPhone6").value = title;
  }
  
  document.getElementById("btn_open_modal6").click();
}





var address_array = [];

function control_address() {

  var checked = document.getElementById("compare_address").checked;
  var check_element = document.getElementsByName("billing-address-same-as-shipping");

  if (checked == false) {

    //document.getElementById("div_save_addess_book").style.display = "block";

    //document.getElementById("btn_open_modal2").click();
    if (check_element) {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("billing_check", "false");
      }

      checked_element_case = false;
    }


  } else {
    //document.getElementById("div_save_addess_book").style.display = "none";

    if (check_element) {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("billing_check", "true");
      }
      checked_element_case = true;
    }
  }
}

function set_billing_address() {
  var cas = checked_element_case;
  if (cas == true) {


    document.getElementsByName("billing-address-same-as-shipping").item(0).checked = false;
    document.getElementsByName("billing-address-same-as-shipping").item(0).click();


  } else {
    document.getElementsByName("billing-address-same-as-shipping").item(0).checked = true;
    document.getElementsByName("billing-address-same-as-shipping").item(0).click();

    var firstname = "";
    var lastname = "";
    var company = "";
    var address = "";
    var city = "";
    var postcode = "";
    var telephone = "";
    var countryId = "";

    if (typeof(Storage) !== "undefined") {
      firstname = localStorage.getItem("firstname");
      lastname = localStorage.getItem("lastname");
      company = localStorage.getItem("company");
      address = localStorage.getItem("address");
      city = localStorage.getItem("city");
      postcode = localStorage.getItem("postcode");
      telephone = localStorage.getItem("telephone");
      countryId = localStorage.getItem("countryId");
    }




    var firstname_element = document.getElementsByName("firstname").item(1);
    firstname_element.value = firstname;
    firstname_element.dispatchEvent(new Event('change'));


    var lastname_element = document.getElementsByName("lastname").item(1);
    lastname_element.value = lastname;
    lastname_element.dispatchEvent(new Event('change'));

    var company_element = document.getElementsByName("company").item(1);
    company_element.value = company;
    company_element.dispatchEvent(new Event('change'));

    var address_element = document.getElementsByName("street[0]").item(1);
    address_element.value = address;
    address_element.dispatchEvent(new Event('change'));


    var city_element = document.getElementsByName("city").item(1);
    city_element.value = city;
    city_element.dispatchEvent(new Event('change'));

    var postcode_element = document.getElementsByName("postcode").item(1);
    postcode_element.value = postcode;
    postcode_element.dispatchEvent(new Event('change'));

    var telephone_element = document.getElementsByName("telephone").item(1);
    telephone_element.value = telephone;
    telephone_element.dispatchEvent(new Event('change'));

    var country_id_element = document.getElementsByName("country_id").item(1);
    country_id_element.value = country_id;
    country_id_element.dispatchEvent(new Event('change'));

    var update_button = document.getElementsByClassName("action-update").item(0);
    update_button.click();



  }

}

function save_new_address2() {
  var firstname = document.getElementById("item_firstname7").value.trim();
  var lastname = document.getElementById("item_lastname7").value.trim();
  var company = document.getElementById("item_company7").value.trim();
  var street = document.getElementById("item_street7").value.trim();
  var postcode = document.getElementById("item_postalcode7").value.trim();
  var house_number = document.getElementById("item_housenumber7").value.trim();
  var toevoeging = document.getElementById("item_toevoeging7").value.trim();
  var city = document.getElementById("item_city7").value.trim();
  var country_id = document.getElementById("countryPhone7").value.trim();
  var telephone = document.getElementById("item_phone7").value.trim();




  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("shipping_firstname", firstname);
    localStorage.setItem("shipping_lastname", lastname);
    localStorage.setItem("shipping_company", company);
    localStorage.setItem("shipping_street", street);
    localStorage.setItem("shipping_postcode", postcode);
    localStorage.setItem("shipping_housenumber", house_number);
    localStorage.setItem("shipping_toevoeging", toevoeging);
    localStorage.setItem("shipping_city", city);
    localStorage.setItem("shipping_country_id", country_id);
    localStorage.setItem("shipping_telephone", telephone);
  }

  if (firstname.length == 0) {
    alert("firstname is required");
    return;
  }
  if (lastname.length == 0) {
    alert("lastname is required");
    return;
  }
  if (company.length == 0) {
    //alert("company is required");
    //return;
    company = ".";
  }
  var address = "";
  if (street.length > 0) {
    address = street;
  } else {
    address = postcode + " " + house_number + " " + toevoeging;
  }

  if (address.length == 0) {
    alert("address is required");
    return;
  }
  //if (city.length == 0)
  // {
  //alert("city is required");
  //return;
  //}
  if (postcode.length == 0) {
    alert("postcode is required");
    return;
  }
  if (country_id.length == 0) {
    alert("country_id is required");
    return;
  }
  if (telephone.length == 0) {
    alert("telephone is required");
    return;
  }


  var address_count = addresses.length;

  //street = street + " " + house_number + " " + toevoeging;
  if (house_number == undefined)
  {
     house_number = "";
  }
  if (toevoeging == undefined)
  {
     toevoeging = "";
  }


  var html = firstname + " " + lastname + ", ";
  html += company + ", ";
  html += (street + " " + house_number + " " + toevoeging).trim() + ", ";

  html += city + ", " + postcode + "," + country_id + ", ";
  html += telephone;


  var countryId = country_id;
  if (countryId == "Austria")
  {
    countryId = "AT";
  }
  
  if (countryId == "Belgium")
  {
    countryId = "BE";
  }
  
  if (countryId == "Bulgaria")
  {
    countryId = "BG";
  }
  if (countryId == "Crotia")
  {
    countryId = "HR";
  }
  if (countryId == "Cyprus")
  {
    countryId = "CY";
  }
  if (countryId == "Czech Republic")
  {
    countryId = "CZ";
  }
  
  if (countryId == "Denmark")
  {
    countryId = "DK";
  }
  if (countryId == "Estonia")
  {
    countryId = "EE";
  }
  
  if (countryId == "Finland")
  {
    countryId = "FI";
  }
  if (countryId == "France")
  {
    countryId = "FR";
  }
  
  if (countryId == "Germany")
  {
    countryId = "DE";
  }
  
  if (countryId == "Greece")
  {
    countryId = "GR";
  }
  
  if (countryId == "Hungary")
  {
    countryId = "HU";
  }
  
  if (countryId == "Ireland")
  {
    countryId = "IE";
  }
  
  if (countryId == "Italy")
  {
    countryId = "IT";
  }
  
  if (countryId == "Latvia")
  {
    countryId = "LV";
  }
  
  if (countryId == "Lithuania")
  {
    countryId = "LT";
  }
  
  if (countryId == "Luxemburg")
  {
    countryId = "LU";
  }
  
  if (countryId == "Malta")
  {
    countryId = "MT";
  }
  
  if (countryId == "Netherlands")
  {
    countryId = "NL";
  }
  
  if (countryId == "Poland")
  {
    countryId = "PL";
  }
  
  if (countryId == "Portugal")
  {
    countryId = "PT";
  }
  
  if (countryId == "Romania")
  {
    countryId = "RO";
  }
  
  if (countryId == "Slovakia")
  {
    countryId = "SK";
  }
  if (countryId == "Slovenia")
  {
    countryId = "SI";
  }
  if (countryId == "Spain")
  {
    countryId = "ES";
  }
  if (countryId == "Sweden")
  {
    countryId = "SE";
  }

  document.getElementById("inp_shipping_country").value = countryId;
  document.getElementById("inp_shipping_postcode").value = postcode;



  document.getElementById("div_shipping_address_1").innerHTML = html;


  document.getElementById("step10_li2").className = "selected";
  if (document.getElementById("step10_li1"))
  {
      document.getElementById("step10_li1").className = "";
  }
  
  if (document.getElementById("step10_li3"))
  {
      document.getElementById("step10_li3").className = "";
  }
  
  var form_firstname_el = document.getElementsByName("firstname").item(1);
  form_firstname_el.value = firstname;
  
  var form_lastname_el = document.getElementsByName("lastname").item(1);
  form_lastname_el.value = lastname;
  
  var form_company_el = document.getElementsByName("company").item(1);
  form_company_el.value = company;
  

 
  var ont_tex = "";
  if (firstname.length > 0) {
    ont_tex = firstname + " " + lastname;
  }
  company = company.trim();
  if (company.length > 1) {
    ont_tex = company;
  }
  
  if (document.getElementById("card_recipient"))
  {
      document.getElementById("card_recipient").innerHTML = ont_tex;
  }
  
  //card_recipient    

  var form_street_el = document.getElementsByName("street[0]").item(1);
  form_street_el.value = street;
  
  var form_city_el = document.getElementsByName("city").item(1);
  form_city_el.value = city;
  
  var form_postcode_el = document.getElementsByName("postcode").item(1);
  form_postcode_el.value = postcode;
    
  var form_telephone_el = document.getElementsByName("telephone").item(1);
  form_telephone_el.value = telephone;    
 

  var form_country_id_el = document.getElementsByName("country_id").item(1);
  form_country_id_el.value = country_id; 
  
  

  const new_obj = {
    knm: address_count,
    cls: "",
    region: "",
    prefix: "",
    firstname: firstname,
    middlename: "",
    lastname: lastname,
    company: company,
    suffix: "",
    street: street,
    city: city,
    postcode: postcode,
    countryId: country_id,
    telephone: telephone,
    house_number: house_number,
    toevoeging: toevoeging
  };
  addresses.push(new_obj);
  
  //save_address_to_website();
    
    
    var form_save_button = document.getElementsByClassName("action-save-address").item(0);
    form_save_button.click();
    document.getElementById("btn_close_modal7").click();
  fill_addresses();


}
function save_address_to_website()
{
    if (typeof(Storage) !== "undefined") 
    {
      var firstname     = localStorage.getItem("shipping_firstname");
      var lastname      = localStorage.getItem("shipping_lastname");
      var company       = localStorage.getItem("shipping_company");
      var street        = localStorage.getItem("shipping_street");
      var postcode      = localStorage.getItem("shipping_postcode");
      var house_number  = localStorage.getItem("shipping_housenumber");
      var toevoeging    = localStorage.getItem("shipping_toevoeging");
      var city          = localStorage.getItem("shipping_city");
      var country_id    = localStorage.getItem("shipping_country_id");
      var telephone     = localStorage.getItem("shipping_telephone");
      
      if (customerData)
      {
         var customer_email = customerData.email;
         if (customer_email !== undefined)
         {
        
            jQuery.ajaxSetup(
              {
                cache: false
              });
              
            var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


            jQuery.post(link,
            {
              m: "addadress",
              param0: firstname,
              param1: lastname,
              param2: company,
              param3: street,
              param4: postcode,
              param5: house_number,
              param6: toevoeging,
              param7: city,
              param8: country_id,
              param9: telephone,
              param10: customer_email
              
              
            },
            function(data, status){
              console.log(data);
            });  
            
            
         }
      }
    
    
  }
}

function save_new_address() {
  var firstname = document.getElementById("item_firstname6").value.trim();
  var lastname = document.getElementById("item_lastname6").value.trim();
  var company = document.getElementById("item_company6").value.trim();
  var street = document.getElementById("item_street6").value.trim();
  var postcode = document.getElementById("item_postalcode6").value.trim();
  var house_number = document.getElementById("item_housenumber6").value.trim();
  var toevoeging = document.getElementById("item_toevoeging6").value.trim();
  var city = document.getElementById("item_city6").value.trim();
  var country_id = document.getElementById("countryPhone6").value.trim();
  var telephone = document.getElementById("item_phone6").value.trim();




  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("shipping_firstname", firstname);
    localStorage.setItem("shipping_lastname", lastname);
    localStorage.setItem("shipping_company", company);
    localStorage.setItem("shipping_street", street);
    localStorage.setItem("shipping_postcode", postcode);
    localStorage.setItem("shipping_housenumber", house_number);
    localStorage.setItem("shipping_toevoeging", toevoeging);
    localStorage.setItem("shipping_city", city);
    localStorage.setItem("shipping_country_id", country_id);
    localStorage.setItem("shipping_telephone", telephone);
  }

  if (firstname.length == 0) {
    alert("firstname is required");
    return;
  }
  if (lastname.length == 0) {
    alert("lastname is required");
    return;
  }
  if (company.length == 0) {
    //alert("company is required");
    //return;
    company = ".";
  }
  var address = "";
  if (street.length > 0) {
    address = street;
  } else {
    address = postcode + " " + house_number + " " + toevoeging;
  }

  if (address.length == 0) {
    alert("address is required");
    return;
  }
  //if (city.length == 0)
  // {
  //alert("city is required");
  //return;
  //}
  if (postcode.length == 0) {
    alert("postcode is required");
    return;
  }
  if (country_id.length == 0) {
    alert("country_id is required");
    return;
  }
  if (telephone.length == 0) {
    alert("telephone is required");
    return;
  }


  var address_count = addresses.length;

  street = street + " " + house_number + " " + toevoeging;
  const new_obj = {
    knm: address_count,
    cls: "",
    region: "",
    prefix: "",
    firstname: firstname,
    middlename: "",
    lastname: lastname,
    company: company,
    suffix: "",
    street: street,
    city: city,
    postcode: postcode,
    countryId: country_id,
    telephone: telephone
  };
  addresses.push(new_obj);

  document.getElementById("btn_close_modal6").click();
  fill_addresses();
}
function get_which_address(code)
{
    var knm = -1;
    if(code == "new_address")
    {
        knm = document.getElementsByClassName("shipping-address-item").length - 1;
    }
    else
    {
       
        var all_address = document.getElementById("inp_housenumbers").value;
        all_address = all_address.replace(/'/gi,'"');
        var all_address_json = JSON.parse(all_address);
        
        for (var j = 0;j < all_address_json.length;j++)
        {
            var active_address = all_address_json[j];
            var address_id = active_address["entity_id"];
            if (address_id == code)
            {
                knm = j;
            }
        }
    }
    return knm;
}

function error_control()
{
    var notuploaded_count = document.getElementsByClassName("notuploaded").length;
    if (document.getElementById("shipping"))
    {
        //if (notuploaded_count == 0 && document.getElementById("shipping").style.display == "none")
        if (document.getElementById("shipping").style.display == "none")
        {
            document.getElementById("btn_products_go_on").click();
        }
    }
    
    var error_message = new Array();

    var tbl_products = document.getElementById("tbl_products");
    
    var not_uploaded_file_count = 0;
    var nup2 = 0;
    
    if (tbl_products)
    {
        not_uploaded_file_count = tbl_products.getElementsByClassName("btn-default").length;
        nup2 = tbl_products.getElementsByClassName("notuploaded").length;
    
        if (not_uploaded_file_count + nup2 > 0) 
        {
            error_message.push("upload uw bestand");
        }
    }
    

    var messages = document.getElementsByClassName("messages");
    if (messages.length > 1)
    {
        messages = messages.item(1).innerHTML;
        if (messages.indexOf("Invalid login or password.") !== -1)
        {
            error_message.push("Verkeerde emailadres of wachtwoord");
        }
    }
    

    

    var authorization_link = document.getElementsByClassName("authorization-link").item(0);
    var authorization_link_html = authorization_link.innerHTML;
    if (authorization_link_html.indexOf("Sign In") !== -1) 
    {
        error_message.push("Voer uw e-mailadres");
    }


    var shipping = document.getElementById("shipping");
    if (shipping)
    {
        var shipping_selected_count = shipping.getElementsByClassName("selected").length;
        if (shipping_selected_count == 0) 
        {
            error_message.push("Voer uw adres");
        }
    }


    var li_day_selection = document.getElementById("other_prices");
    if (li_day_selection)
    {
        var li_day_selection_selected_count = li_day_selection.getElementsByClassName("selected").length;
        if (li_day_selection_selected_count == 0) 
        {
            error_message.push("Voer uw afleverdatum");
        }
    }
    

    var checkout_shipping_method_load = document.getElementById("checkout-shipping-method-load");
    if (checkout_shipping_method_load)
    {
        var checkout_shipping_method_load_selected_count = checkout_shipping_method_load.getElementsByClassName("selected").length;
        if (checkout_shipping_method_load_selected_count == 0) 
        {
            error_message.push("Kies Verzendmethode");
        }
    }

    var payment_div = document.getElementById("payment");
    if (payment_div)
    {
        var checkout_payment_method_load = document.getElementById("checkout-payment-method-load");
        if (checkout_payment_method_load)
        {
            var checkout_payment_method_load_selected_count = checkout_payment_method_load.getElementsByClassName("selected").length;
            if (checkout_payment_method_load_selected_count == 0) 
            {
                error_message.push("Kies Betaalmethode");
            }
        }
    }
    
    if (error_message.length  > 0)
    {
        var first_message = error_message[0];
        if (first_message == "upload uw bestand")
        {
            document.getElementById("div_checkout_error_message").innerHTML = '<a style="color:red;display:block;font-size:11px">upload uw bestand</a>';
        }
        
        if (first_message == "Verkeerde emailadres of wachtwoord")
        {
            document.getElementById("div_checkout_error_message").innerHTML = '<a style="color:red;display:block;font-size:11px">Verkeerde emailadres of wachtwoord</a>';
        }
    
        if (first_message == "Voer uw e-mailadres")
        {
            if (document.getElementById("opc-shipping_method"))
            {
                document.getElementById("opc-shipping_method").className = "checkout-shipping-method step_error_div";
            }
            
            if (document.getElementById("other_prices"))
            {
                document.getElementById("other_prices").className = "step_error_div";
            }
            
            if (document.getElementById("shipping"))
            {
                document.getElementById("shipping").className = "checkout-shipping-address step_error_div";
            }
            
            if (document.getElementById("payment"))
            {
                document.getElementById("payment").className = "checkout-payment-method";
            }
            
            if (document.getElementById("shipping"))
            {
                document.getElementById("shipping").getElementsByClassName("step_error").item(0).innerHTML = "<a>Voer je e-mailadres</a>";
            }
            if (document.getElementById("div_checkout_error_message"))
            {
                document.getElementById("div_checkout_error_message").innerHTML = '<a style="color:red;display:block;font-size:11px">Voer je e-mailadres</a>';
            }
            
            
        }
    
        if (first_message == "Voer uw adres")
        {
            if (document.getElementById("opc-shipping_method"))
            {
                document.getElementById("opc-shipping_method").className = "checkout-shipping-method step_error_div";
            }
            
            if (document.getElementById("other_prices"))
            {
                document.getElementById("other_prices").className = "step_error_div";
            }
            
            if (document.getElementById("shipping"))
            {
                document.getElementById("shipping").className = "checkout-shipping-address step_error_div";
            }
            
            if (document.getElementById("payment"))
            {
                document.getElementById("payment").className = "checkout-payment-method";
            }
            
        
            if (document.getElementById("shipping"))
            {
                document.getElementById("shipping").getElementsByClassName("step_error").item(0).innerHTML = "<a>Voer uw adres</a>";
            }
        
            if (document.getElementById("div_checkout_error_message"))
            {
                document.getElementById("div_checkout_error_message").innerHTML = '<a style="color:red;display:block;font-size:11px">Voer uw adres</a>';
            }
            
            
        }
    
        if (first_message == "Voer uw afleverdatum")
        {
            if (document.getElementById("opc-shipping_method"))
            {
                document.getElementById("opc-shipping_method").className = "checkout-shipping-method step_error_div";
            }
            
            if (document.getElementById("other_prices"))
            {
                document.getElementById("other_prices").className = "step_error_div";
                if (document.getElementById("other_prices").getElementsByClassName("step_error").length > 0)
                {
                    document.getElementById("other_prices").getElementsByClassName("step_error").item(0).innerHTML = "<a>Voer uw afleverdatum</a>";
                }
            }
            
            if (document.getElementById("shipping"))
            {
                document.getElementById("shipping").className = "checkout-shipping-address";
            }
            
            if (document.getElementById("payment"))
            {
                document.getElementById("payment").className = "checkout-payment-method";
            }
            
            if (document.getElementById("div_checkout_error_message"))
            {
                document.getElementById("div_checkout_error_message").innerHTML = '<a style="color:red;display:block;font-size:11px">Voer uw afleverdatum</a>';
            }
            
            
        }
    
        if (first_message == "Kies Verzendmethode")
        {
            document.getElementById("opc-shipping_method").className = "checkout-shipping-method step_error_div";
            document.getElementById("other_prices").className = "";
            document.getElementById("shipping").className = "checkout-shipping-address";
            document.getElementById("payment").className = "checkout-payment-method";
        
            document.getElementById("opc-shipping_method").getElementsByClassName("step_error").item(0).innerHTML = "<a>Kies Verzendmethode</a>";
            document.getElementById("div_checkout_error_message").innerHTML = '<a style="color:red;display:block;font-size:11px">Kies Verzendmethode</a>';
        }
    
        if (first_message == "Kies Betaalmethode")
        {
            if (document.getElementById("opc-shipping_method"))
            {
                document.getElementById("opc-shipping_method").className = "checkout-shipping-method";
            }
            
            if (document.getElementById("other_prices"))
            {
                document.getElementById("other_prices").className = "";
            }
            
            
            if (document.getElementById("shipping"))
            {
                document.getElementById("shipping").className = "checkout-shipping-address";
            }
            
            if (document.getElementById("payment"))
            {
                document.getElementById("payment").className = "checkout-payment-method step_error_div";
                document.getElementById("payment").getElementsByClassName("step_error").item(0).innerHTML = "<a>Kies Betaalmethode</a>";
            }
            
            if (document.getElementById("div_checkout_error_message"))
            {
                document.getElementById("div_checkout_error_message").innerHTML = '<a style="color:red;display:block;font-size:11px">Kies Betaalmethode</a>';
            }
            
            
        }
    }
    else
    {
        if (document.getElementById("opc-shipping_method"))
        {
            document.getElementById("opc-shipping_method").className = "checkout-shipping-method";
        }
        if (document.getElementById("other_prices"))
        {
            document.getElementById("other_prices").className = "";
        }
        if (document.getElementById("shipping"))
        {
            document.getElementById("shipping").className = "checkout-shipping-address";
        }
        if (document.getElementById("payment"))
        {
            document.getElementById("payment").className = "checkout-payment-method";
        }
        if (document.getElementById("div_checkout_error_message"))
        {
            document.getElementById("div_checkout_error_message").innerHTML = "";
        }
        
        
       
        if (document.getElementById("checkout-payment-method-load"))
        {
            if (document.getElementById("checkout-payment-method-load").getElementsByClassName("selected").length > 0)
            {
                document.getElementById("btn-placeOrder").disabled = false;
                document.getElementById("btn-placeOrder").className = "btn btn-success";
                document.getElementById("btn-placeOrder").setAttribute("onclick","control_settings()");
            }
        }
       

    }
}

if (window.location.href.indexOf("/checkout") !== -1)
{
    setInterval(error_control, 2000);
}



function set_shipping_address_2(knm)
{
    var adress_count = document.getElementsByClassName("shipping-address-item").length - 1;
  
    var all_address = document.getElementById("inp_housenumbers").value;
    //all_address = all_address.replace(/'/gi,'"');
    var all_address_json = JSON.parse(all_address);
    
    if (knm > adress_count)
    {
        knm = adress_count;
    }
    /*if (knm ==  all_address_json.length)
    {
        var country_id = document.getElementsByName("country_id").item(1).value;
        var postcode = document.getElementsByName("postcode").item(1).value;
    
        var street = document.getElementsByName("street[0]").item(1).value;
        var company = document.getElementsByName("company").item(1).value;
        var city = document.getElementsByName("city").item(1).value;
        var firstname = document.getElementsByName("firstname").item(1).value;
        var lastname = document.getElementsByName("lastname").item(1).value;
        var telephone = document.getElementsByName("telephone").item(1).value;
        
        var address_str = firstname + " " + lastname + " ," + company + " ," + (street + " " + house_number + " " +  toevoeging).trim() + " ," + city + " ," + postcode + " ," + country_id + " ," + telephone;
        
        document.getElementById("div_shipping_address_2").innerHTML = address_str;
    }
    else
    {*/
      
        //all_address = all_address.replace(/'/gi,'"');
        //var all_address_json = JSON.parse(all_address);
        
        var active_address = all_address_json[knm];
        var entity_id = active_address["entity_id"];
        var firstname = active_address["firstname"];
        var lastname = active_address["lastname"];
        var company = active_address["company"];
        var city = active_address["city"];
        var street = active_address["street"];
        var house_number = active_address["house_number"];
        var toevoeging = active_address["toevoeging"];
        var postcode = active_address["postcode"];
        var country_id = active_address["country_id"];
        var telephone = active_address["telephone"];
        
        var address_str = firstname + " " + lastname + " ," + company + " ," + (street + " " + house_number + " " +  toevoeging).trim() + " ," + city + " ," + postcode + " ," + country_id + " ," + telephone;
        
        document.getElementById("div_shipping_address_2").innerHTML = address_str;
        var name_str = firstname + " " + lastname;
        
        document.getElementById("card_recipient").innerHTML = name_str;
        
    //}
}

function select_address(index) 
{
    set_address_id(index)
    var ul_adress_lis = document.getElementById("ul_address").getElementsByTagName("li");

  for (var j = 0; j < ul_adress_lis.length; j++) 
  {
    var sel_li = ul_adress_lis[j];
    sel_li.className = "";

  }
  if (document.getElementById("ul_address_li_" + index)) {
    document.getElementById("ul_address_li_" + index).className = "selected";
  }

    var adress_count = document.getElementsByClassName("shipping-address-item").length;
    var address_knm = get_which_address(index);
    sel_address(address_knm, adress_count);
    set_shipping_address_2(address_knm);
    
    //div_shipping_address_2
    
    clear_selected();
    hide_1();
    set_producttotal_prices();

}

var selected = 0;


function clear_selected()
{
  setTimeout(function(){
    var extra_prices = document.getElementById("other_prices");
    var divs = extra_prices.getElementsByTagName("div");
    for (var i = 0;i < divs.length;i++)
    {
      var active_div = divs.item(i);
      var class_name = active_div.getAttribute("class");
      if (class_name)
      {
        if (class_name.indexOf("card2") !== -1)
        {
          active_div.setAttribute("class","card2");
        }
      }
    }
    
    var shipment_section = document.getElementById("checkout-shipping-method-load");
    if (shipment_section)
    {
        var trs = shipment_section.getElementsByTagName("tr");
        for (var j = 0;j < trs.length;j++)
        {
          var active_tr = trs.item(j);
          active_tr.setAttribute("class","row");
        }
    }
    
    document.getElementById("opc-shipping_method").style.position = "absolute";
    document.getElementById("opc-shipping_method").style.left = "-50000px";
    
   
    
  },100);
    
}

function get_default_shipping_address_knm()
{
    var inp_default_shipping_address = document.getElementById("inp_default_shipping_address").value;
    inp_default_shipping_address = inp_default_shipping_address.replace(/'/gi,'"');
    var json = JSON.parse(inp_default_shipping_address);
    
    var knm = 0;
    if (document.getElementsByClassName("shipping-address-items").length > 0) 
    {
        var  active_addresses = document.getElementsByClassName("shipping-address-items");
        for (var i = 0; i < active_addresses.length;i++)
        {
            
        }
    }
}





function sel_address(index, adress_count) {
  selected = 0;
  for (i = 0; i < adress_count; i++) {

    var btn_count = get_btn_count(index)
    if (btn_count == 0) {
      if (selected == 0) {
        if (document.getElementsByClassName("shipping-address-items")) {
          if (document.getElementsByClassName("shipping-address-items").length > 0) {
            var sel_item = document.getElementsByClassName("shipping-address-items").item(0);
            if (sel_item.getElementsByClassName("action-select-shipping-item")) {
              if (sel_item.getElementsByClassName("action-select-shipping-item").length > 0) {
                sel_item.getElementsByClassName("action-select-shipping-item").item(0).click();
              }
            }
          }
        }

      }

    } else {
      var sel_item = document.getElementsByClassName("shipping-address-item").item(index);
      var btn_ = sel_item.getElementsByClassName("action-select-shipping-item");
      sel_item.getElementsByClassName("action-select-shipping-item").item(0).click();

      selected = 1;
    }

  }
}
function close_new_address()
{
  document.getElementById("btn_close_modal").click();
  document.getElementById("ontvager_step1").style.display = "none";
  document.getElementById("ontvager_step1").style.position = "absolute";
  document.getElementById("ontvager_step1").style.left = "-99999px";
  
  document.getElementById("checkout-step-shipping").style.position = "relative";
  document.getElementById("checkout-step-shipping").style.left = "0";
  document.getElementById("checkout-step-shipping").style.display = "block";
  
  document.getElementById("customer-email").value = "";
  document.getElementById("customer-email").focus();
  
}
function get_btn_count(index) {
  var sel_item = document.getElementsByClassName("shipping-address-item").item(index);
  var btn = sel_item.getElementsByClassName("action-select-shipping-item");
  return btn.length;
}


var checked_element_case;
var billing_address;


function save_address2() {
  var firstname = document.getElementById("item_firstname2").value.trim();
  var lastname = document.getElementById("item_lastname2").value.trim();
  var company = document.getElementById("item_company2").value.trim();
  var street = document.getElementById("item_street2").value.trim();
  var postcode = document.getElementById("item_postalcode2").value.trim();
  var house_number = document.getElementById("item_housenumber2").value.trim();
  var toevoeging = document.getElementById("item_toevoeging2").value.trim();
  var city = document.getElementById("item_city2").value.trim();
  var country_id = document.getElementById("item_country_id2").value.trim();
  var telephone = document.getElementById("item_phone2").value.trim();

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("billing_firstname", firstname);
    localStorage.setItem("billing_lastname", lastname);
    localStorage.setItem("billing_company", company);
    localStorage.setItem("billing_street", street);
    localStorage.setItem("billing_postcode", postcode);
    localStorage.setItem("billing_house_number", house_number);
    localStorage.setItem("billing_toevoeging", toevoeging);
    localStorage.setItem("billing_city", city);
    localStorage.setItem("billing_telephone", telephone);
    localStorage.setItem("billing_country_id", country_id);

  }


  if (firstname.length == 0) {
    alert("firstname is required");
    return;
  }
  if (lastname.length == 0) {
    alert("lastname is required");
    return;
  }
  if (company.length == 0) {
    //alert("company is required");
    //return;
    company = ".";
  }
  var address = "";
  if (street.length > 0) {
    address = street;
  } else {
    address = postcode + " " + house_number + " " + toevoeging;
  }

  if (address.length == 0) {
    alert("address is required");
    return;
  }
  //if (city.length == 0)
  // {
  //alert("city is required");
  //return;
  //}
  if (postcode.length == 0) {
    alert("postcode is required");
    return;
  }
  if (country_id.length == 0) {
    alert("country_id is required");
    return;
  }
  if (telephone.length == 0) {
    alert("telephone is required");
    return;
  }




  if (city.length > 0) {

  } else {
    city = "Utrecht";
  }


  var html = "<b>" + firstname + " " + lastname + "</b><br />";
  html += "<a>" + company + "</a><br />";
  html += "<a>" + address + "</a><br />";
  html += "<a>" + city + "," + postcode + "," + country_id + "</a><br />";
  html += "<a>" + telephone + "</a>";

  document.getElementById("div_shipping_address_1").innerHTML = html;


  billing_address = {
    "firstname": firstname,
    "lastname": lastname,
    "company": company,
    "address": address,
    "city": city,
    "postcode": postcode,
    "telephone": telephone,
    "country_id": country_id
  };



  document.getElementById("btn_close_modal2").click();


}



function save_address8() {
  var firstname = document.getElementById("item_firstname8").value.trim();
  var lastname = document.getElementById("item_lastname8").value.trim();
  var company = document.getElementById("item_company8").value.trim();
  var street = document.getElementById("item_street8").value.trim();
  var postcode = document.getElementById("item_postalcode8").value.trim();
  var house_number = document.getElementById("item_housenumber8").value.trim();
  var toevoeging = document.getElementById("item_toevoeging8").value.trim();
  var city = document.getElementById("item_city8").value.trim();
  var country_id = document.getElementById("countryPhone8").value.trim();
  var telephone = document.getElementById("item_phone8").value.trim();

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("sender_firstname", firstname);
    localStorage.setItem("sender_lastname", lastname);
    localStorage.setItem("sender_company", company);
    localStorage.setItem("sender_street", street);
    localStorage.setItem("sender_postcode", postcode);
    localStorage.setItem("sender_house_number", house_number);
    localStorage.setItem("sender_toevoeging", toevoeging);
    localStorage.setItem("sender_city", city);

    localStorage.setItem("sender_telephone", telephone);
    localStorage.setItem("sender_country_id", country_id);

  }

  if (firstname.length == 0) {
    alert("firstname is required");
    return;
  }
  if (lastname.length == 0) {
    alert("lastname is required");
    return;
  }
  if (company.length == 0) {
    //alert("company is required");
    //return;
    company = ".";
  }
  var address = "";
  if (street.length > 0) {
    address = street;
  } else {
    address = postcode + " " + house_number + " " + toevoeging;
  }

  if (address.length == 0) {
    alert("address is required");
    return;
  }
  //if (city.length == 0)
  // {
  //alert("city is required");
  //return;
  //}
  if (postcode.length == 0) {
    alert("postcode is required");
    return;
  }
  if (country_id.length == 0) {
    alert("country_id is required");
    return;
  }
  if (telephone.length == 0) {
    alert("telephone is required");
    return;
  }
  if (city.length > 0) {

  } else {
    city = "Utrecht";
  }
  document.getElementById("btn_close_modal8").click();
}

function save_address3() {
  var firstname = document.getElementById("item_firstname3").value.trim();
  var lastname = document.getElementById("item_lastname3").value.trim();
  var company = document.getElementById("item_company3").value.trim();
  var street = document.getElementById("item_street3").value.trim();
  var postcode = document.getElementById("item_postalcode3").value.trim();
  var house_number = document.getElementById("item_housenumber3").value.trim();
  var toevoeging = document.getElementById("item_toevoeging3").value.trim();
  var city = document.getElementById("item_city3").value.trim();
  var country_id = document.getElementById("countryPhone3").value.trim();
  var telephone = document.getElementById("item_phone3").value.trim();

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("sender_firstname", firstname);
    localStorage.setItem("sender_lastname", lastname);
    localStorage.setItem("sender_company", company);
    localStorage.setItem("sender_street", street);
    localStorage.setItem("sender_postcode", postcode);
    localStorage.setItem("sender_house_number", house_number);
    localStorage.setItem("sender_toevoeging", toevoeging);
    localStorage.setItem("sender_city", city);

    localStorage.setItem("sender_telephone", telephone);
    localStorage.setItem("sender_country_id", country_id);

  }

  if (firstname.length == 0) {
    alert("firstname is required");
    return;
  }
  if (lastname.length == 0) {
    alert("lastname is required");
    return;
  }
  if (company.length == 0) {
    //alert("company is required");
    //return;
    company = ".";
  }
  var address = "";
  if (street.length > 0) {
    address = street;
  } else {
    address = postcode + " " + house_number + " " + toevoeging;
  }

  if (address.length == 0) {
    alert("address is required");
    return;
  }
  //if (city.length == 0)
  // {
  //alert("city is required");
  //return;
  //}
  if (postcode.length == 0) {
    alert("postcode is required");
    return;
  }
  if (country_id.length == 0) {
    alert("country_id is required");
    return;
  }
  if (telephone.length == 0) {
    alert("telephone is required");
    return;
  }
  if (city.length > 0) {

  } else {
    city = "Utrecht";
  }

  var ontganver = "";
  company = company.trim();
  
  if (company.length == 1) 
  {
    ontganver = firstname + " " + lastname;
  } else {
    ontganver = company;
  }

  document.getElementById("card_recipient").innerHTML = ontganver;
  document.getElementById("btn_close_modal3").click();
}

function trigger_an_item_name(item_name) {
  e = jQuery.Event('keyup');
  e.keyCode = 20; // enter
  jQuery('#' + item_name).trigger(e);
}
function get_bezorg_address_knm()
{
    var inp_default_shipping_address = document.getElementById("inp_default_shipping_address").value;
    inp_default_shipping_address = inp_default_shipping_address.replace(/'/gi,'"');
    var json1 = JSON.parse(inp_default_shipping_address);
    var entity_id1 = json1["entity_id"];
    
    var knm = 0;
    var all_addresses = document.getElementById("inp_housenumbers").value;
    all_addresses = all_addresses.replace(/'/gi,'"');
    var json2 = JSON.parse(all_addresses);
    
    for (var i = 0;i < json2.length;i++)
    {
        var active_json = json2[i];
        var entity_id2 = active_json["entity_id"];
        if (entity_id2 == entity_id1)
        {
            knm = i;
        }
    }
    return knm;
    
}

function set_standard_bezorg_address() 
{
    set_address_id(0)
    if (document.getElementById("step10_li1"))
    {
        document.getElementById("step10_li1").className = "selected";
        document.getElementById("step10_li2").className = "";
    }
    

    
    var adress_count = document.getElementsByClassName("shipping-address-item").length;
    var knm = get_bezorg_address_knm();
    sel_address(knm, adress_count);

    var standaard_bezorg_address_a = document.getElementById("standaard_bezorg_address_a").innerHTML;
    var receiver = standaard_bezorg_address_a.split(",")[0];
  
    var postcode = standaard_bezorg_address_a.split(",")[4];
    var country = standaard_bezorg_address_a.split(",")[5];
  
    document.getElementById("inp_shipping_country").value = country;
    document.getElementById("inp_shipping_postcode").value = postcode;
    document.getElementById("card_recipient").innerHTML = receiver;
  
    clear_selected();
    document.getElementById("step10_li3").className = "";
    hide_1();
    set_producttotal_prices();
}

function show_new_address0() {
  document.getElementById("step10_li2").className = "selected";
  document.getElementById("step10_li1").className = "";
  document.getElementById("step10_li3").className = "";
  document.getElementById("btn_open_modal").click();
  //step10_li2
  // body...
}

function close_addresses() {
  setTimeout(function() {
    document.getElementById("btn_close_modal4").click();
    
    document.getElementById("step10_li3").className = "selected";
    document.getElementById("step10_li2").className = "";
    document.getElementById("step10_li1").className = ""
    
    
  }, 1000);
}

function fill_addresses() {

  var html = "";
  

  var all_addresses = document.getElementById("inp_housenumbers").value;
  //all_addresses = all_addresses.replace(/'/gi,'"');
  addresses = JSON.parse(all_addresses); 
  
  if (addresses.length > 0)
  {
    for (var i = 0; i < addresses.length; i++) {
      var active_address = addresses[i];
    
      var address_id = active_address.entity_id;    
      var firstname = active_address.firstname;
      var lastname = active_address.lastname;
      var company = active_address.company;
      var street = active_address.street;
      var city = active_address.city;
      var postcode = active_address.postcode;
      var countryId = active_address.country_id;
      var telephone = active_address.telephone;
      var house_number = active_address.house_number;
      var toevoeging = active_address.toevoeging;
      street = street + " " + house_number + " " + toevoeging;
      street = street.trim();

      html += "<li id='ul_address_li_" + address_id + "' onclick='select_address(" + address_id + ");close_addresses();'>";
      html += "<div style='padding:20px'>";
      html += "<b>" + firstname + " " + lastname + "</b><br>";
      html += "<a>" + company + "</a><br>";

      html += "<a>" + street + "</a><br>";
      html += "<a>" + city + ", " + postcode + "</a><br>";
      html += "<a>" + countryId + "</a><br>";
      html += "<a>Tel:" + telephone + "</a>";

      html += "</div>";

      html += "<span class='checkmark'></span>";
      html += "</li>";
    }
  }
  
  var add_count = document.getElementsByClassName("shipping-address-item").length;
  if (add_count.length > addresses.length)
  {
        var address_id = "new_address";
        var country_id = document.getElementsByName("country_id").item(1).value;
        var postcode = document.getElementsByName("postcode").item(1).value;
        var house_number = document.getElementsByName("house_number").item(1).value;
        var toevoeging  = document.getElementsByName("toevoeging").item(1).value;
        var street = document.getElementsByName("street[0]").item(1).value;
        var company = document.getElementsByName("company").item(1).value;
        var city = document.getElementsByName("city").item(1).value;
        var firstname = document.getElementsByName("firstname").item(1).value;
        var lastname = document.getElementsByName("lastname").item(1).value;
        var telephone = document.getElementsByName("telephone").item(1).value;
        
        html += "<li id='ul_address_li_" + address_id + "' onclick='select_address(" + address_id + ");close_addresses();'>";
        html += "<div style='padding:20px'>";
        html += "<b>" + firstname + " " + lastname + "</b><br>";
        html += "<a>" + company + "</a><br>";

        html += "<a>" + street + "</a><br>";
        html += "<a>" + city + ", " + postcode + "</a><br>";
        html += "<a>" + country_id + "</a><br>";
        html += "<a>Tel:" + telephone + "</a>";

        html += "</div>";

        html += "<span class='checkmark'></span>";
        html += "</li>";
  }
  
  

  document.getElementById("ul_address").innerHTML = html;
}

function show_address_book() {
  /*document.getElementById("step10_li3").className = "selected";
  document.getElementById("step10_li2").className = "";
  document.getElementById("step10_li1").className = "";*/
  fill_addresses();
  document.getElementById("btn_open_modal4").click();

  console.log(addresses);


  //step10_li3
}

function search_address(obj) {
  var txt = obj.value.trim();
  txt = txt.toUpperCase();
  if (txt.length > 0) {
    var html = "";

    
    
    for (var i = 0; i < addresses.length; i++) {
      var active_address = addresses[i];
      var knm = active_address.entity_id;
      var firstname = active_address.firstname;
      var lastname = active_address.lastname;
      var company = active_address.company;
      var street = active_address.street;
      var city = active_address.city;
      var postcode = active_address.postcode;
      var countryId = active_address.countryId;
      var telephone = active_address.telephone;

      var res = 0;
      if (firstname.toUpperCase().indexOf(txt) !== -1) {
        res = 1
      };
      if (lastname.toUpperCase().indexOf(txt) !== -1) {
        res = 1
      };
      if (company.toUpperCase().indexOf(txt) !== -1) {
        res = 1
      };
      if (street.toUpperCase().indexOf(txt) !== -1) {
        res = 1
      };
      if (city.toUpperCase().indexOf(txt) !== -1) {
        res = 1
      };
      if (postcode.toUpperCase().indexOf(txt) !== -1) {
        res = 1
      };


      if (res == 1) {
        var address_id = get_which_address(knm);
        
        var all_addresses = document.getElementById("inp_housenumbers").value;
        all_addresses = all_addresses.replace(/'/gi,'"');
        var all_addresses_json  = JSON.parse(all_addresses);
        var active_address =  all_addresses_json[address_id];
        
        var house_number = "";
        var toevoeging = "";
        if (knm == all_addresses_json.length)
        {
            house_number = document.getElementsByName("house_number").item(1).value;
            toevoeging  = document.getElementsByName("toevoeging").item(1).value;
        }
        else
        {
            var house_number = active_address["house_number"];
            var toevoeging = active_address["toevoeging"];
        }
        
        
        
        street = street + " " + house_number + " " + toevoeging;
        street = street.trim();
        
        
          
        html += "<li id='ul_address_li_" + knm + "' onclick='select_address(" + knm + ")'>";
        html += "<div style='padding:20px'>";
        html += "<b>" + firstname + " " + lastname + "</b><br>";
        html += "<a>" + company + "</a><br>";

        html += "<a>" + street + "</a><br>";
        html += "<a>" + city + ", " + postcode + "</a><br>";
        html += "<a>" + countryId + "</a><br>";
        html += "<a>Tel:" + telephone + "</a>";

        html += "</div>";

        html += "<span class='checkmark'></span>";
        html += "</li>";
      }

    }
    document.getElementById("ul_address").innerHTML = html;
  } else {
    fill_addresses();
  }
}

function typeText(item, text, delay, i) {
  jQuery(item).append(text.charAt(i))
    .delay(delay)
    .promise()
    .done(function() {
      if (i < text.length) {
        i++;
        typeText(item, text, delay, i);
      }
    });
}

function show_new_address() {

  var email = document.getElementById("customer-email").value.trim();
 
  document.getElementById("item_email").value = email;

  var modal = document.getElementById("myModal");
  var iti__selected_flag = modal.getElementsByClassName("iti__selected-flag");
  
  if (iti__selected_flag.length > 0)
  {
    iti__selected_flag = iti__selected_flag.item(0);
    var title = iti__selected_flag.getAttribute("title");
    title = title.split("(");
    title = title[0];
    title = title.trim();
    title = title.split(":")[0];
    title = title.trim();

    document.getElementById("countryPhone").value = title;
  }
  


  document.getElementById("btn_open_modal").click();
  document.getElementById("checkout-step-shipping").style.position = "absolute";
  document.getElementById("checkout-step-shipping").style.left = "-50000px";



  document.getElementById("step1_li1").className = "selected";
  //document.getElementById("step1_li2").className = "";

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("billing_check", "false");
  }



}

function show_inloggen() {
  document.getElementById("customer-email-fieldset").style.position = "relative";
  document.getElementById("customer-email-fieldset").style.left = "0";
  document.getElementById("co-shipping-form").style.position = "absolute";
  document.getElementById("co-shipping-form").style.left = "-50000px";

  document.getElementById("step1_li2").className = "selected";
  document.getElementById("step1_li1").className = "";
}

function get_active_tr(str) 
{
  var element = document.getElementById("opc-sidebar");
  var _trs = element.getElementsByTagName("tr");
  for (var i = 0; i < _trs.length; i++) {
    var active_tr = _trs.item(i).innerHTML;
    if (active_tr.indexOf(str) !== -1) {
      return i;
    }
  }
}

function get_image_src(item_id) {
  var mini_cart = document.getElementById("mini-cart");
  var secondaries = mini_cart.getElementsByClassName("secondary");
  var snc = "";
  for (var i = 0; i < secondaries.length; i++) {
    var a_element = secondaries.item(i).getElementsByTagName("a").item(0);
    var data_cart_item = a_element.getAttribute("data-cart-item");
    data_cart_item = parseInt(data_cart_item);

    if (item_id == data_cart_item) {
      var parent_element = a_element.parentElement.parentElement.parentElement.parentElement;

      snc = parent_element.getElementsByTagName("img").item(0).src;

    }
  }
  return snc;
}

function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

Array.prototype.diff = function(a) {
  return this.filter(function(i) {
    return a.indexOf(i) < 0;
  });
};


function delete_control2() {

  
    var link = window.location.href;
    if (link.indexOf("/checkout") !== -1) {
      var cart_element = document.getElementById("mini-cart");
      if (cart_element) {
        var delete_item = cart_element.getElementsByClassName("delete");
        if (delete_item.length == 0) {
          //location.reload();
        } 
        else 
        {
          var cart_ = document.getElementById("minicart-content-wrapper");
          var delete_items_ = cart_.getElementsByClassName("action delete");
          
          var arr = [];
          for (var j = 0;j < delete_items_.length;j++)
          {
             var delete_item_ = delete_items_.item(j);
             var delete_item_id = delete_item_.getAttribute("data-cart-item");
             arr.push(delete_item_id);
          }
          
          
          var tbl_products = document.getElementsByClassName("tbl_products");
          for (var k = 0; k < tbl_products.length; k++) 
          {
            var selected_item = tbl_products.item(k);
            var selected_id = selected_item.id;
            selected_id = selected_id.replace("tbl_products_", "");
            
            if (arr.includes(selected_id))
            {
              
            } 
            else
            {
                if (document.getElementById("tbl_products_"  + selected_id))
                {
                   deleteRow("tbl_products_"  + selected_id);
                }
                if (document.getElementById("tr_btn_"  + selected_id))
                {
                   deleteRow("tr_btn_"  + selected_id);
                }
                if (document.getElementById("tr_software_"  + selected_id))
                {
                   deleteRow("tr_software_"  + selected_id);
                }
                if (document.getElementById("tr_hardware_"  + selected_id))
                {
                   deleteRow("tr_hardware_"  + selected_id);
                }
                
                if (document.getElementById("responsive_table_"  + selected_id))
                {
                  var element = document.getElementById("responsive_table_"  + selected_id);
                  element.parentNode.removeChild(element);
                }
                
                
            }
            

          }
  

        }
      } else {
       // location.reload();
      }
    }
 
}
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


function delete_control() 
{
setTimeout(function() {
    var link = window.location.href;
    if (link.indexOf("/checkout") !== -1) {
      //rev1
        var item_ids_array = new Array(); 
        var tbl_products = document.getElementsByClassName("tbl_products");
        if (tbl_products.length == 0)
        {
            location.reload();
        }
        else
        {
            for (var i = 0;i < tbl_products.length;i++)
            {
                var active_tbl = tbl_products[i];
                active_tbl_id = active_tbl.id;
                active_tbl_id = active_tbl_id.replace("tbl_products_","");
                item_ids_array.push(active_tbl_id);
            }
            var item_ids_text = item_ids_array.join();
             var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


              jQuery.post(link,
              {
                m: 'getids',
                idd: item_ids_text
              },
              function(data, status)
              {
                  var new_items = new Array();
                  
                  
                  var json = JSON.parse(data);
                  var stat = json.stat;
                  if (stat == "ok")
                  {
                      var items = json.items;
                      for (var j = 0;j < items.length;j++)
                      {
                          var active_item = items[j];
                          new_items.push(active_item);
                      }
                      
                    var dif1 = item_ids_array.diff(new_items); 
                    console.log(dif1); // => [1, 2, 6]
                    if (dif1.length > 0)
                    {
                        for (var k = 0;k < dif1.length;k++)
                        {
                            var selected_id = dif1[k];
                            if (document.getElementById("tbl_products_"  + selected_id))
                            {
                               deleteRow("tbl_products_"  + selected_id);
                            }
                            if (document.getElementById("tr_btn_"  + selected_id))
                            {
                               deleteRow("tr_btn_"  + selected_id);
                            }
                            if (document.getElementById("tr_software_"  + selected_id))
                            {
                               deleteRow("tr_software_"  + selected_id);
                            }
                            if (document.getElementById("tr_hardware_"  + selected_id))
                            {
                               deleteRow("tr_hardware_"  + selected_id);
                            }
                            
                            
                            if (document.getElementById("responsive_table_"  + selected_id))
                            {
                              var element = document.getElementById("responsive_table_"  + selected_id);
                              element.parentNode.removeChild(element);
                            }
                        }
                    }
                    
                    

                      
                      
                  }
                  
                  console.log(data);
              });
            
        }
        
              
            

          }
          closecart();

        },1500);
      } 


function delete_softwarepms_item(item_id)
{
 
  

    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


  jQuery.post(lnk,
  {
    m: 'removesoftwarepms',
    idd: item_id
  },
  function(data, status){
    var tr_software = document.getElementById("tr_software_" + item_id);
    if (tr_software)
    {
      var price_item = tr_software.getElementsByClassName("td_software_price").item(0);
      price_item .innerHTML = "€ 0";
      tr_software.style.display = "none";
      
  
      
      
    }
  });
}

function delete_hardwarepms_item(item_id)
{

  
  var lnk = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


  jQuery.post(lnk,
  {
    m: 'removehardwarepms',
    idd: item_id
  },
  function(data, status){
    var tr_hardware = document.getElementById("tr_hardware_" + item_id);
    if (tr_hardware)
    {
      var price_item = tr_hardware.getElementsByClassName("td_hardware_price").item(0);
      price_item .innerHTML = "€ 0";
      tr_hardware.style.display = "none";
      

      
    }
  })
}

function deleteRow(rowid)  
{   
    var row = document.getElementById(rowid);
    row.parentNode.removeChild(row);
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function get_image_count()
{
    var cnt = 0;
    var element = document.getElementById("tbl_products");
    if (element)
    {
      var td_prices = element.getElementsByClassName("td_price");
      for (var j = 0;j < td_prices.length;j++)
      {
        var active_td = td_prices.item(j);
        var img = active_td.getElementsByTagName("img");
        cnt = cnt + img.length;
      }
    }
    
    return cnt;
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function update_price() {

  document.getElementsByClassName("loading-mask-shopby").item(0).style.display = "block";
  var cart_element = document.getElementById("mini-cart");

  if (cart_element) {
    for (var j = 0; j < cart_element.getElementsByClassName("delete").length; j++) {
      var selected = cart_element.getElementsByClassName("delete").item(j);

      var selected_item_id = selected.getAttribute("data-cart-item");
      var price_td = document.getElementById("td_price_" + selected_item_id);
      if (price_td) {
        var link_img = window.location.origin;
        var image_link = link_img + "/pub/static/frontend/Sm/market/en_US/images/loader-1.gif";
       // price_td.innerHTML = "<img src='" + image_link + "' style='width:30px' >";
      }

    }
    if (cart_element.getElementsByClassName("delete").length > 0)
    {
      var delete_item = cart_element.getElementsByClassName("delete").item(0);
   
   
    var item_id = delete_item.getAttribute("data-cart-item");

    var rnd = makeid(20);
  
    var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      var data = this.responseText;
      
      if (data && IsJsonString(data) == true) {
        
        var json = JSON.parse(data);
        
        var dat = json["dat"];

        if (dat.length > 0) {
          var total = 0;

          for (var i = 0; i < dat.length; i++) {
            var selected_dat = dat[i];
            var item_id_ = selected_dat["item_id"];
            var total_ = selected_dat["total"];
            total += parseFloat(total_);

            var price_td = document.getElementById("td_price_" + item_id_);
            if (price_td) {

              price_td.innerHTML = "€ " + total_;
            }
          }

          var subtotal_item = document.getElementsByClassName("subtotal");
          for (var k = 0; k < subtotal_item.length; k++) {
            var price_element = subtotal_item.item(k).getElementsByClassName("price-wrapper");
            if (price_element && price_element.length > 0) {
              total = parseFloat(total).toFixed(2);
              price_element.item(0).innerHTML = "€ " + total;
            }
          }

          for (var i = 0; i < dat.length; i++) 
          {
            var selected_dat = dat[i];
            var item_id_ = selected_dat["item_id"];
            var total_ = selected_dat["total"];
            var qty_ = selected_dat["qty"];

            var li_elements = cart_element.getElementsByTagName("li");
            for (var l = 0; l < li_elements.length; l++) {
              var selected_li = li_elements.item(l);
              var selected_li_html = selected_li.innerHTML;

              var src_txt = 'data-cart-item="' + item_id_ + '"';
              if (selected_li_html.indexOf(src_txt) !== -1) {
                    var price_el = selected_li.getElementsByClassName("price").item(0);
                    price_el.innerHTML = "€ " + total_;
                    
                    var product_name_element = selected_li.getElementsByClassName("product-item-name").item(0).getElementsByTagName("a").item(0);
                    product_name = product_name_element.innerHTML;

                    var product_qty = product_name.split(" ")[0];
                    product_name = product_name.replace(product_qty, "");
                    product_name = product_name.trim();
                    product_name = qty_ + "x " + product_name;
                    product_name_element.innerHTML = product_name;

              }

            }

          }

          document.getElementsByClassName("loading-mask-shopby").item(0).style.display = "none";
          var active_link = window.location.href;
          if (active_link.indexOf("checkout") !== -1)
          {
                var cnt = get_image_count();
                if (cnt > 0)
                {
                  //rev1
                 
                  //setTimeout(update_price,1000);
                }
          }     
        }
      } else {
        //alert("price error");
        //rev1
        
      }


    }
    xhttp.open("POST", link);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("m=calculatecart2&site=vlaggenactie&cid=" + item_id);
  }
  }



  document.getElementsByClassName("loading-mask-shopby").item(0).style.display = "none";


}

function set_peymentmethod_selected(paymentmethod) {
    show_payment();
  var payment_method = paymentmethod.method;
  
  var txt = "";

     if (payment_method == "mollie_methods_creditcard") {
      txt = "Credit Cards";
    }
    if (payment_method == "mollie_methods_ideal") {
      txt = "iDeal";
    }
    if (payment_method == "mollie_methods_kbc") {
      txt = "KBC / CBC";
    }
    if (payment_method == "mollie_methods_banktransfer") {
      txt = "Banktransfer";
    }
    if (payment_method == "mollie_methods_paypal") {
      txt = "Paypal";
    }
    if (payment_method == "mollie_methods_sofort") {
      txt = "Sofort";
    }
    if (payment_method == "mollie_methods_belfius") {
      txt = "Belfius";
    }
    if (payment_method == "mollie_methods_bancontact") {
      txt = "Bankcontact";
    }
  
  document.getElementsByClassName("card_content_novalue").item(0).innerHTML = "<a>" + txt + "</a>";
  
  var payment_method_titles = document.getElementsByClassName("payment-method-title");
    for (var j = 0;j < payment_method_titles.length;j++)
    {
        var active_div = payment_method_titles.item(j);
        active_div.className = "payment-method-title field choice";
    }
    if (document.getElementById(payment_method))
    {
        var par_element = document.getElementById(payment_method).parentElement;
        par_element.className = "payment-method-title field choice selected";
        
        
        document.getElementById("btn-placeOrder").disabled = false;
        document.getElementById("btn-placeOrder").className = "btn btn-success";
        document.getElementById("btn-placeOrder").setAttribute("onclick", "control_settings()");
      
       
      
      
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("payment_method", payment_method);
    
        //setTimeout(get_paymentmethod_selected, 2000);
      }
        //console.log("a----" + payment_method);
    }
  
    
}

function get_paymentmethod_selected() 
{
  var payment_titles = document.getElementsByClassName("payment-method-title");
  for (var i = 0; i < payment_titles.length; i++) {
    var payment_id = payment_titles[i];
    payment_id.className = "payment-method-title field choice";
  }


  if (typeof(Storage) !== "undefined") {
    var payment_method = localStorage.getItem("payment_method");
    //document.getElementById(payment_method).click();
    var txt = "";
    if (payment_method == "mollie_methods_creditcard") {
      txt = "Credit Cards";
    }
    if (payment_method == "mollie_methods_ideal") {
      txt = "iDeal";
    }
    if (payment_method == "mollie_methods_kbc") {
      txt = "KBC / CBC";
    }
    if (payment_method == "mollie_methods_banktransfer") {
      txt = "Banktransfer";
    }
    if (payment_method == "mollie_methods_paypal") {
      txt = "Paypal";
    }
    if (payment_method == "mollie_methods_sofort") {
      txt = "Sofort";
    }
    if (payment_method == "mollie_methods_belfius") {
      txt = "Belfius";
    }
    if (payment_method == "mollie_methods_bancontact") {
      txt = "Bankcontact";
    }

    var el1 = document.getElementsByClassName("card_content_novalue").item(0);
    //el1.innerHTML = "<a>" + txt + "</a>";

    //var el = document.getElementById(payment_method);
    //var parent_element = el.parentElement;
    //parent_element.className = "payment-method-title field choice selected";

    //var loading_item = document.getElementsByClassName("loading-mask-shopby").item(0);
    //loading_item.style.display = "none";

    //console.log("b---" + payment_method);

    //document.getElementById("btn-placeOrder").disabled = false;
    //document.getElementById("btn-placeOrder").className = "btn btn-success";

    //document.getElementById("btn-placeOrder").setAttribute("onclick", "control_settings()");
    
  }
}




window.addEventListener('load', function() {
 
  
  
  var breadcrumbs = document.getElementsByClassName("breadcrumbs");
  if (breadcrumbs) {
    if (breadcrumbs.length > 0) {
      breadcrumbs = breadcrumbs.item(0);
      var breadcrumbs_li = breadcrumbs.getElementsByTagName("li");
      breadcrumbs_li.item(breadcrumbs_li.length - 1).className = "breadcrumbs_last_li";
    }

  }


});






function save_address_book() {

}










var price_data = [];

function get_selected_tr_index(title) {
  var snc = 0;

  var table = document.getElementsByClassName("table-checkout-shipping-method").item(0);
  var trs = table.getElementsByTagName("tr");
  var srch_text = ">" + title + "<";
  for (var i = 0; i < trs.length; i++) {
    var tr_html = trs[i].innerHTML;
    if (tr_html.indexOf(srch_text) !== -1) {
      snc = i;
    }
  }
  return snc;
}

var myVar2;



	function show_p() 
	{	
    	
}

function control_shipping()
{
  var authorization_link = document.getElementsByClassName("authorization-link").item(0);
    var authorization_link_html = authorization_link.innerHTML;
    var opc_shipping_method = document.getElementById("opc-shipping_method");
  if (opc_shipping_method)
  {
    var disp = opc_shipping_method.style.position;
    if (disp == "absolute")
    {
       var error_message = document.getElementById("div_checkout_error_message");
      if (error_message)
      {
          var error_messages = error_message.innerHTML;
          //Voer uw adres
      
         
          
          
      }
    }
  }
}


function go_to_shipping_method(obj, day,day_type) {
  
  setTimeout(set_producttotal_prices,200);
  //console.log("fetching shipping prices");
  
  var day_str = day + "_" + day_type;
  setTimeout(set_shipping_prices(day_str),1000);
  
  document.getElementById("card_shipping_text").innerHTML = "";
  document.getElementById("card_shipping_price").innerHTML = "";
  
  document.getElementById("inp_shipping_daycount").value = day;
  
  
  
  
  
  document.getElementById("span_custom_date").innerHTML = "Kies Een Andere Datum";
  /*var div_products = document.getElementById("div_products");
  var notuploaded_images_count = div_products.getElementsByClassName("btn-default").length;
  if (notuploaded_images_count > 0) {
 
    alert("You must upload all files to go on");
    return;
  }*/

  var shipping_address_items = document.getElementsByClassName("shipping-address-item");
  if (shipping_address_items.length == 0) 
  {
    //var login_cont = login_control();
  }



 // console.log(control);

  var cart = document.getElementsByClassName("tbl_products");
  if (cart.length > 0) {

    var item_id = cart.item(0).id;
    item_id = item_id.replace("tbl_products_","");

    var span_0 = obj.getElementsByTagName("span").item(0);
    var shipping_date = span_0.innerHTML;

    var span_1 = obj.getElementsByTagName("span").item(obj.getElementsByTagName("span").length - 2);
    var extra_price = span_1.innerHTML;
    extra_price = extra_price.replace("+", "");
    
    extra_price = extra_price.trim();
    extra_price = extra_price.replace(" ", "");

    var shipping_day = shipping_date.split(" ")[0];
    document.getElementById("inp_shipping_day").value = shipping_day;
    document.getElementById("inp_shipping_date").value = shipping_date;
    
    set_shipping_date(shipping_date,0);

    document.getElementById("card_date").innerHTML = shipping_date;
    document.getElementById("card_extra_fee").innerHTML = extra_price;

 
    

  }
  for (var i = 0; i < 20; i++) {

      if (document.getElementById("card2_" + i + "_normal"))
      {
        document.getElementById("card2_" + i + "_normal").className = "card2";
      }
      if (document.getElementById("card2_" + i + "_saturday"))
      {
        document.getElementById("card2_" + i + "_saturday").className = "card2";
      }
    
  }
  document.getElementById("card2_custom").className = "card2";
  document.getElementById("card2_" + day + "_" + day_type).className = "card2 selected";


  var picker_height = document.getElementById("div_date_picker").style.height;
  if (picker_height.length == 0) {
    picker_height = "0px";
  }
  if (picker_height !== "0px") {
    var btn = document.getElementsByClassName("ui-datepicker-trigger").item(0);
    btn.click();

    document.getElementById("div_date_picker").style.height = "0px";
  }

    show_shipping();
}

function login_control() {
  var login_item = document.getElementsByClassName("authorization-link").item(0);
  var login_item_html = login_item.innerHTML;
  var test = false;
  if (login_item_html.indexOf("logout") !== -1) {
    test = true;
  }
  return test;

}

function address_control() {
  var err = 0;
  var knm = "";
  
  var firstname  = "";	
  	
  if (document.getElementsByName("firstname"))	
  {	
    if (document.getElementsByName("firstname").length > 0)	
    {	
      firstname = document.getElementsByName("firstname").item(0).value.trim();	
    }	
  }	
  	
  
  if (firstname.length == 0) {
    err = err + 1;
    knm = "firstname";
  }

  var lastname = "";	
  if (document.getElementsByName("lastname"))	
  {	
    if (document.getElementsByName("lastname").length > 0)	
    {	
        lastname = document.getElementsByName("lastname").item(0).value.trim();	
    }	
    	
  };
  
  if (lastname.length == 0) {
    err = err + 1;
    knm = "lastname";
  }

  var company = "";	
  if (document.getElementsByName("company"))	
  {	
     if (document.getElementsByName("company").length > 0)	
     {	
        company = document.getElementsByName("company").item(0).value.trim();	
     }	
  }
  
  if (company.length == 0) {
    //err = err + 1;
    //knm = "company";
  }

  var street = "";	
  if (document.getElementsByName("street[0]"))	
  {	
    if (document.getElementsByName("street[0]").length > 0)	
    {	
      street = document.getElementsByName("street[0]").item(0).value.trim();	
    }	
  }
  
  if (street.length == 0) {
    err = err + 1;
    knm = "street";
  }

  var city = "";	
  if (document.getElementsByName("city"))	
  {	
    if (document.getElementsByName("city").length > 0)	
    {	
      city = document.getElementsByName("city").item(0).value.trim();	
    }	
  }
  
  if (city.length == 0) {
    err = err + 1;
    knm = "city";
  }

  var postcode = "";	
  	
  if (document.getElementsByName("postcode"))	
  {	
    if (document.getElementsByName("postcode").length > 0)	
    {	
      postcode = document.getElementsByName("postcode").item(0).value.trim();	
    }	
  }
  
  if (postcode.length == 0) {
    err = err + 1;
    knm = "postcode";
  }

  var telephone = document.getElementsByName("telephone");
  if (document.getElementsByName("telephone").length > 0)
  {
      telephone = telephone.item(0).value.trim();
  
      if (telephone.length == 0) {
        err = err + 1;
        knm = "telephone";
      }
  }

  
  
  err = 0;

  var obj = {
    "err": err,
    "knm": knm
  };
  return obj;

}

function go_on() {
//  document.getElementById("checkout").style.display = "block";
//  document.getElementById("shipping").style.display = "block";
 



}

function control_settings() {
    set_payment_price();
  if (typeof(Storage) !== "undefined") {
    var billing_check = localStorage.getItem("billing_check");
    var billing_firstname = localStorage.getItem("billing_firstname");
    var billing_lastname = localStorage.getItem("billing_lastname");
    var billing_company = localStorage.getItem("billing_company");
    var billing_street = localStorage.getItem("billing_street");
    var billing_postcode = localStorage.getItem("billing_postcode");
    var billing_house_number = localStorage.getItem("billing_house_number");
    var billing_toevoeging = localStorage.getItem("billing_toevoeging");
    var billing_city = localStorage.getItem("billing_city");
    var billing_telephone = localStorage.getItem("billing_telephone");
    var billing_country_id = localStorage.getItem("billing_country_id");


    var shipping_firstname = localStorage.getItem("shipping_firstname");
    var shipping_lastname = localStorage.getItem("shipping_lastname");
    var shipping_company = localStorage.getItem("shipping_company");
    var shipping_street = localStorage.getItem("shipping_street");
    var shipping_postcode = localStorage.getItem("shipping_postcode");
    var shipping_housenumber = localStorage.getItem("shipping_housenumber");
    var shipping_toevoeging = localStorage.getItem("shipping_toevoeging");
    var shipping_city = localStorage.getItem("shipping_city");
    var shipping_country_id = localStorage.getItem("shipping_country_id");
    var shipping_telephone = localStorage.getItem("shipping_telephone");

    var sender = localStorage.getItem("sender");
    var sender_firstname = localStorage.getItem("sender_firstname");
    var sender_lastname = localStorage.getItem("sender_lastname");
    var sender_company = localStorage.getItem("sender_company");
    var sender_street = localStorage.getItem("sender_street");
    var sender_postcode = localStorage.getItem("sender_postcode");
    var sender_house_number = localStorage.getItem("sender_house_number");
    var sender_toevoeging = localStorage.getItem("sender_toevoeging");
    var sender_city = localStorage.getItem("sender_city");
    var sender_telephone = localStorage.getItem("sender_telephone");
    var sender_country_id = localStorage.getItem("sender_country_id");

    var total_producten = localStorage.getItem("total_producten");
    var total_producten_excl = localStorage.getItem("total_producten_excl");
    var total_producten_incl = localStorage.getItem("total_producten_incl");
    var card_shipping_price = localStorage.getItem("card_shipping_price");
    var card_shipping_text = localStorage.getItem("card_shipping_text");
    var pakbon = localStorage.getItem("pakbon");
    var pakbon_loc = localStorage.getItem("pakbon_loc");

    var card_day = localStorage.getItem("card_day");
    var card_date = localStorage.getItem("card_date");
    var card_extra_fee = localStorage.getItem("card_extra_fee");
  
 
      var url = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


    var cart = document.getElementById("mini-cart");

    var delete_item = cart.getElementsByClassName("delete");
    delete_item = delete_item.item(0);
    var item_id = delete_item.getAttribute("data-cart-item");
    var reference = document.getElementById("reference").value;

    jQuery.ajaxSetup(
              {
                cache: false
              });
              
    jQuery.post(url, {
        m: "savequotesettings",
        item_id: item_id,
        billing_check: billing_check,
        billing_firstname: billing_firstname,
        billing_lastname: billing_lastname,
        billing_company: billing_company,
        billing_street: billing_street,
        billing_postcode: billing_postcode,
        billing_house_number: billing_house_number,
        billing_toevoeging: billing_toevoeging,
        billing_city: billing_city,
        billing_telephone: billing_telephone,
        billing_country_id: billing_country_id,
        shipping_firstname: shipping_firstname,
        shipping_lastname: shipping_lastname,
        shipping_company: shipping_company,
        shipping_street: shipping_street,
        shipping_postcode: shipping_postcode,
        shipping_housenumber: shipping_housenumber,
        shipping_toevoeging: shipping_toevoeging,
        shipping_city: shipping_city,
        shipping_country_id: shipping_country_id,
        shipping_telephone: shipping_telephone,
        sender: sender,
        sender_firstname: sender_firstname,
        sender_lastname: sender_lastname,
        sender_company: sender_company,
        sender_street: sender_street,
        sender_postcode: sender_postcode,
        sender_house_number: sender_house_number,
        sender_toevoeging: sender_toevoeging,
        sender_city: sender_city,
        sender_telephone: sender_telephone,
        sender_country_id: sender_country_id,
        total_producten: total_producten,
        total_producten_excl: total_producten_excl,
        total_producten_incl: total_producten_incl,
        card_shipping_price: card_shipping_price,
        card_shipping_text: card_shipping_text,
        pakbon: pakbon,
        pakbon_loc: pakbon_loc,
        card_day: card_day,
        card_date: card_date,
        card_extra_fee: card_extra_fee, 
        reference: reference
      },
      function(data, status) {

        placeOrder();
      });



    /*var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Authorization", "Bearer mt0dgHmLJMVQhvjpNXDyA83vA_PxH23Y");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      }
    };

    var data = `{}`;

    xhr.send(data);*/



  }
}

function set_reference(obj) 
{
  var reference = obj.value.trim();
  
  var reference_element = document.getElementsByName("reference-code");
  if (reference_element.length > 0)
  {
      for (var i = 0;i < reference_element.length;i++)
      {
          reference_element.item(i).value = reference;
      }
      
  }
}

function show_whitelabel_afzender() {
  document.getElementById("step3_li2").className = "selected";
  document.getElementById("step3_li1").className = "";

  var html = "<span>De gekozen bezorgdienst gebruikt een standaard (whitelabel) adres als afzender.</span>";
  document.getElementById("div_label").innerHTML = html;

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("sender", "whitelabel");
  }
}

function show_eigen_afzender() {
  document.getElementById("step3_li1").className = "selected";
  document.getElementById("step3_li2").className = "";

  var html = `<span>Klik <a  class="div_label_a" onclick="show_afzender_label()">hier</a> om je eigen afzender in te stellen.</span>`;
  document.getElementById("div_label").innerHTML = html;

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("sender", "eigen");
  }
}

function show_geen_pakbona() {
  document.getElementById("step2_li1").className = "selected";
  document.getElementById("step2_li2").className = "";
  document.getElementById("div_upload").style.display = "none";

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("pakbon", "geen");
  }
}

function show_eigen_pakbona() {
  document.getElementById("step2_li2").className = "selected";
  document.getElementById("step2_li1").className = "";
  document.getElementById("div_upload").style.display = "block";

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("pakbon", "eigen");
  }

}

function SavePhoto(e) {
  var cart_item = document.getElementById("mini-cart");
  if (cart_item) {


    var delete_item = cart_item.getElementsByClassName("delete").item(0);
    delete_item = delete_item.getAttribute("data-cart-item");
    
    
    var link = window.location.origin + "/code/productionprocess/save_pakbon.php";
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    let photo = e.files[0];

    formData.append("item_id", delete_item);
    formData.append("photo", photo);
    formData.append("m", "save_pakbon");

    xhr.onreadystatechange = state => {
        console.log(xhr.status);
      } // err handling
    xhr.timeout = 5000;
    xhr.open("POST", link);
    xhr.send(formData);
  }

}

function show_afzender_label() {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("sender_firstname", "");
    localStorage.setItem("sender_lastname", "");
    localStorage.setItem("sender_company", "");
    localStorage.setItem("sender_address", "");
    localStorage.setItem("sender_city", "");
    localStorage.setItem("sender_postcode", "");
    localStorage.setItem("sender_telephone", "");
    localStorage.setItem("sender_country_id", "");

  }

  var modal = document.getElementById("myModal8");
  var iti__selected_flag = modal.getElementsByClassName("iti__selected-flag");
  if (iti__selected_flag.length > 0)
  {
    iti__selected_flag = iti__selected_flag.item(0);
    var title = iti__selected_flag.getAttribute("title");
    title = title.split("(");
    title = title[0];
    title = title.trim();
    
    title = title.split(":")[0];
    title = title.trim();

    document.getElementById("countryPhone8").value = title;
  }
  

  document.getElementById("btn_open_modal8").click();
}

  function winkelwagens_samenvoegen()
    {
        document.getElementById("winkel_3").className = "selected card";
        document.getElementById("winkel_1").className = "card";
        document.getElementById("winkel_2").className = "card";
        
        document.getElementById("btn_go_on").disabled = false;
        document.getElementById("btn_go_on").className = "btn btn-block btn-primary";
        document.getElementById("btn_go_on").setAttribute("onclick","samenvoegen()");
        
        document.getElementById("btn_go_on").style.display = "block";
    }
    
 function winkelwagens_legen() 
    {
        document.getElementById("winkel_1").className = "selected card";
        document.getElementById("winkel_2").className = "card";
        document.getElementById("winkel_3").className = "card";
        
        document.getElementById("btn_go_on").disabled = false;
        document.getElementById("btn_go_on").className = "btn btn-block btn-primary";
        document.getElementById("btn_go_on").setAttribute("onclick","legen()");
        
        document.getElementById("btn_go_on").style.display = "block";
    }
    
function winkelwagens_opslaan()
{
  document.getElementById("winkel_2").className = "selected card";
  document.getElementById("winkel_1").className = "card";
  document.getElementById("winkel_3").className = "card";
        
  document.getElementById("btn_go_on").disabled = false;
  document.getElementById("btn_go_on").className = "btn btn-block btn-primary";
  document.getElementById("btn_go_on").setAttribute("onclick","opslaan()");
  
  document.getElementById("btn_go_on").style.display = "block";
}

function bewaren_voor_later() {
  closeNav();
    var ref = "";
    if (document.getElementById("reference"))
    {
      ref = document.getElementById("reference").value.trim();
    }
    if (ref.length > 0)
    {
      save_for_later(ref);
    }
    else
    {
      open_bewaren_voor_later_modal();
    }

}
function open_bewaren_voor_later_modal()
{
  var customer_id = document.getElementById("inp_customerid").value;
  if (customer_id.length > 0)
  {
    document.getElementById("bewaren_voor_later_modal_btn").click();
  }
  else
  {
     closeNav();
    document.getElementById("myModal_customer_uyari_btn").click();
    setTimeout(function()
    {
     
      document.getElementById("myModal_customer_uyari_close_btn").click();
      
      customer_login2();
    },2000);
  }
  
}
function save_for_later_modal()
{
  var reference_item = document.getElementById("inp_bewaren_voor_later_modal_reference");
  var reference = reference_item.value.trim();
  if (reference.length > 0)
  {
    document.getElementById("bewaren_voor_later_modal_close_btn").click();
    save_for_later(reference);
    
  }
  else
  {
    alert("Please fill reference");
  }
}


function save_for_later(ref)
{
  require(['jquery'], function($) {
        $(document).ready(function() {
            jQuery.ajaxSetup(
                {
                  cache: false
                });
                
                var day = "99";
                if (typeof(Storage) !== "undefined") {
                  day = localStorage.getItem("card_day");
                }
          
                var mini_cart = document.getElementById("mini-cart");
                if (mini_cart) 
                {
                  var delete_item = mini_cart.getElementsByClassName("delete");
                  if (delete_item) {
                    delete_item = delete_item.item(0);
                    var delete_item_id = delete_item.getAttribute("data-cart-item");
                    
                      var link = location.origin + "/code/productionprocess/getdat.php?numpar=" + Math.floor((Math.random() * 1000) + 1);


                    jQuery.post(link, 
                    {
                        m: "saveforlater",
                        cid: delete_item_id,
                        ref: ref,
                        day: day
                      },
                      function(data, status) {
                        //alert("Data: " + data + "\nStatus: " + status);
                      });
                    
                  }
                  
                }
  
            
        });
  });
}





