/*
	Universitet: https://mandat.dtm.uz/JsonFiles/Universities.json
	Fakultets: https://mandat.dtm.uz/JsonFiles/Faculties.json
*/
$(function() {
    function run() {
        var t = "<option>Hududni tanlang</option>";
        for (var i = 0; i < region.length; i++) {
            t += "<option value=" + region[i].id + ">" + region[i].name_uz + "</option>";
        }
        $(".hudud").html(t);
    }
    run();
    $(".hudud").on("change", function() {
        var id = $(".hudud").val();
        var text = "<option>OTM ni tanlang</option>";
        for (var i = 0; i < universitet.length; i++) {
            if (universitet[i].RegCode == id) {
                text += "<option value=" + universitet[i].UNCode + ">" + universitet[i].UNFName + "</option>";
            }
        }
        $(".otm").html(text);
    });
    $(".otm").on('change',function() {
        var id = $(".otm").val();
        var text = "<option>Yo'nalishni tanlang</option>";
        for (var i = 0; i < fakultet.length; i++) {
            if (fakultet[i].VUZ == id) {
                text += "<option value=" + fakultet[i].MVDir + ">" + fakultet[i].Name + "</option>";
            }
        }
        $(".yunalish").html(text);

    });
    $(".yunalish").on("change",function() {
    	var id = $(".otm").val();
    	var id1 = $(".yunalish").val();
        var text = "<option>Tilni tanlang</option>",arr = [];
        for (var i = 0; i < lang.length; i++) {
            if (lang[i].UNCode == id && lang[i].MVDir == id1) {
                arr.push(lang[i]);
            }
        }
        var x = 1;
        for (var i = 0; i < arr.length; i++) {
        	text += "<option value=" + x + ">" + arr[i].NameL + "</option>";
        	x ++;
        }
        $(".til").html(text);
    });

    $(".til").on("change",function() {
    	var id = $(".otm").val();
    	var id1 = $(".yunalish").val();
    	var lang = $(".til").val();
        var text = "<option>Tilni tanlash</option>",arr = [];
        for (var i = 0; i < turi.length; i++) {
            if (turi[i].UNCode == id && turi[i].MVDir == id1 && turi[i].lang_id == lang) {
                arr.push(turi[i]);
            }
        }
        for (var i = 0; i < arr.length; i++) {
        	text += "<option value=" + arr[i].LCode + ">" + arr[i].LNameLT + "</option>";
        }
        $(".shakli").html(text);
    });
});