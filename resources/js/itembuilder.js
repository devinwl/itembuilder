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

	$("#heroes").selectpicker();

	$(".item_container").sortable({
		connectWith: ".item_container",
		items: ".dropped",
		tolerance: "pointer",
		receive: function(event, ui) {
			var dest = $(this).attr("id");
			$(ui.item).appendTo("#"+dest+" ul");
			calcGoldCosts();
		}
	}).droppable({
		accept: ".item",
		drop: function(event, ui) {
			var name = $(ui.draggable).attr("name");
			var cost = $(ui.draggable).attr("cost");
			var contents = $("<li>").attr("name", name).attr("cost", cost).addClass("dropped").html($("<img/>").attr("src", "resources/img/items/"+name+".png")).prepend($("<a>").addClass("item_del").html("X").click(function() { removeItem($(this).parent()); }));
			var dest = $(this).attr("id");
			contents.appendTo("#" + dest + " ul");

			calcGoldCosts();
		}
	});

	$("#submit_build").click( function() {
		console.log("Generate the build!");
		$("#starting > ul > li").each( function(i, item) {
			console.log(item);
		});
		return false;
	});

	function removeItem(item) {
		$(item).remove();
		calcGoldCosts();
	}

	function calcGoldCosts() {
		var cost = 0;
		$("#starting > ul > li").each( function(i, item) {
			cost = parseInt(cost) + parseInt($(item).attr("cost"));
		});
		var starting_cost = cost;

		var cost = 0;
		$("#early > ul > li").each( function(i, item) {
			cost = parseInt(cost) + parseInt($(item).attr("cost"));
		});
		var early_cost = cost;

		var cost = 0;
		$("#core > ul > li").each( function(i, item) {
			cost = parseInt(cost) + parseInt($(item).attr("cost"));
		});
		var core_cost = cost;

		var cost = 0;
		$("#luxury > ul > li").each( function(i, item) {
			cost = parseInt(cost) + parseInt($(item).attr("cost"));
		});
		var luxury_cost = cost;

		if(starting_cost > 603) {
			$("#errors").html($("<div>").addClass("alert").html("<strong>Hold it!</strong> Your starting item costs are more than 603 gold."));
		}
		else {
			$("#errors").html("");
		}

		$("#starting_header").html("Starting Items ("+starting_cost+" gold)");
		$("#early_header").html("Early Game ("+early_cost+" gold)");
		$("#core_header").html("Core Items ("+core_cost+" gold)");
		$("#luxury_header").html("Situational Items ("+luxury_cost+" gold)");
	}
});