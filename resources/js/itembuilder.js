$(function() {

	var $starting 	= $("#starting"),
		$early		= $("#early"),
		$core		= $("#core"),
		$luxury		= $("luxury");

	$.getJSON("resources/items.json", function(json) {
		$.each(json.items, function(i, item) {
			if(item.itemVisible == "1")
				$("<li>").attr("name", item.itemNameBasic).attr("cost", item.itemCost).addClass("item").html($("<img/>").attr("src", "resources/img/items/"+item.itemNameBasic+".png")).appendTo("#items > ul");
		});

		$(".item").draggable({
			revert: "invalid",
			helper: "clone",
			cursor: "move",
			connectWith: ".item_container"
		});
	});

	$(".item_container").sortable({
		connectWith: ".item_container",
		items: ".dropped",
		tolerance: "pointer",
		receive: function(event, ui) {
			var dest = $(this).attr("id");
			$(ui.item).appendTo("#"+dest+" ul");
		}
	}).droppable({
		accept: ".item",
		drop: function(event, ui) {
			var name = $(ui.draggable).attr("name");
			var cost = $(ui.draggable).attr("cost");
			var contents = $("<li>").attr("name", name).attr("cost", cost).addClass("dropped").html($("<img/>").attr("src", "resources/img/items/"+name+".png")).prepend($("<a>").addClass("item_del").html("X").click(function() { $(this).parent().remove(); }));
			var dest = $(this).attr("id");
			contents.appendTo("#" + dest + " ul");
		}
	});

	$("#submit_build").click( function() {
		console.log("Generate the build!");
		$("#starting > ul > li").each( function(i, item) {
			console.log(item);
		});
		return false;
	});
});