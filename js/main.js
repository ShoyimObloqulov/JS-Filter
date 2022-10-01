$(function() {
    function run() {

        //http requests
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://robocontest.uz/api/regions", false);
        xhttp.send();

        var t = "";

        // response
        const viloyatlar = JSON.parse(xhttp.responseText);
        for (var i = viloyatlar.length - 1; i >= 0; i--) {
            t += `<option id=row${viloyatlar[i].id} value=${viloyatlar[i].id}>${viloyatlar[i].name}</option>`
        }
        $(".viloyat").html(t);
    }
    run();
    $('.viloyat').on('change', function() {
        var id = $(".viloyat").val();
        $.ajax({
            url: "https://robocontest.uz/api/regions",
            method: "GET",
            data: "q=" + id,
            dataType: "json",
            success: function(a) {
                var tuman = a;
                var t = "";
                for (var i = tuman.length - 1; i >= 0; i--) {
                    t += `<option value=${tuman[i].id}>${tuman[i].name}</option>`
                }
                $(".tuman").html(t);
            }
        });
    });

    function strreplace(x) {
        var t = "";
        for (var i = 0; i <= x.length - 1; i++) {
            if (x[i] == ' ') { break; }
            t += x[i];
        }
        return t;
    }
    $(".tuman").on('change', function() {
        $(".talim").html("<option value=\"0\">O'rta talim</option><option value=\"1\">Oliy Talim</option>");
    });

    $(".talim").on('change', function() {
        var t = $(".talim").val();
        var id = $(".viloyat").val();
        var viloyat = strreplace($('#row' + id).val('0').text());

        $.ajax({
            url: "https://robocontest.uz/api/study_places",
            method: "GET",
            data: "term=" + viloyat + "&_type=query&q=" + viloyat,
            dataType: "json",
            success: function(x) {
                x = x.items;
                var t = "";
                for (var i = x.length - 1; i >= 0; i--) {
                    t += `<option value=${x[i].id}>${x[i].name}</option>`
                }
                console.log(t);
                $(".uquv").html(t);
            }
        });
    });
    $(".talim").on("change", function() {
        var type = $(".talim").val();

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://robocontest.uz/api/study_levels/" + type, false);
        xhttp.send();

        var k = JSON.parse(xhttp.responseText).items;
        var t = "";
        for (var i = k.length - 1; i >= 0; i--) {
            t += `<option value=${k[i].id}>${k[i].name}</option>`
        }
        $(".kurs").html(t);
    });

    $("#button1").click(function() {
    	var search = $("#search1").val();

    	$.ajax({
            url: "https://robocontest.uz/api/study_places",
            method: "GET",
            data: "term=" + search + "&_type=query&q=" + search,
            success: function(x) {
                x = x.items;
                var t = "";
                for (var i = x.length - 1; i >= 0; i--) {
                    if (x[i].type == 1) {
                    	t += `
                    		<tr>
	                    		<td>${x[i].id}</td>
					        	<td>Oliy Talim</td>
					        	<td>${x[i].name}</td>
	                    	</tr>
	                    `
                    }else{
                    	t += `
                    		<tr>
	                    		<td>${x[i].id}</td>
					        	<td>Umum talim</td>
					        	<td>${x[i].name}</td>
	                    	</tr>
	                    `
                    }
                }
                console.log(t);
                $(".tr").html(t);
            }
        });
    	
    })
})