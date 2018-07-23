
document.addEventListener('DOMContentLoaded', function() {

	const submit_btn = document.querySelector("#submit");
	const task_list = document.querySelector("#task-list");

	// Dodawanie nowego zadania
	function add_task(form_value)
	{
		let date = new Date();
		let dateText = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() + ' godz: ' + date.getHours() + ':' + date.getMinutes();
		
		// Dodawanie nowego diva z elementami zadaniowymi
		const new_task = document.createElement("div");
		new_task.classList.add("new-task");
		//new_task.classList.add("hidden");								//	Part I - Dodaje klase, ktora nie istnieje
		
		// Dodawaie nowego diva z naglowkiem
		const task_header = document.createElement("div");
		task_header.classList.add("task-header");
		
		// Dodawanie naglowka w divie z naglowkiem
		const h3 = document.createElement("h3");
		h3.innerText = "Nowe zadanie z dnia: " + dateText;
		
		// Dodawanie nowego przycisku usuwajacego zadanie
		const x_button = document.createElement("button");
		x_button.classList.add("x-button");
		x_button.innerText = "X";
		
		// Dodawanie diva z treścią zadania
		const task_text = document.createElement("div");
		task_text.classList.add("task-text");
		
		// Dodawanie paragrafu z treścią do diva z treścią zadania
		const task_text_paragraph = document.createElement("p");
		task_text_paragraph.innerText = form_value;
		
		// Dodawanie nowego przycisku edytującego zadanie
		const edit_button = document.createElement("button");
		edit_button.classList.add("edit-button");
		edit_button.innerText = "Edytuj";
		
		// Wrzucanie h3 i x-buttona do diva task-header
		task_header.appendChild(h3);
		task_header.appendChild(x_button);
		
		// Wrzucanie p i edit-button do diva task_text
		task_text.appendChild(task_text_paragraph);
		task_text.appendChild(edit_button);
		
		// Wrzucanie diva task-header i task-text do diva new-task
		new_task.appendChild(task_header);
		new_task.appendChild(task_text);
		
		// Wrzucanie diva new-task do task-list
		task_list.appendChild(new_task);
	}
	
	submit_btn.addEventListener("click", function(e)
	{
		e.preventDefault();					// Zabron domyslnego zachowania przegladarki - bez tego zadanie pojawia sie i znika, bo klikajac button wywoluje sie zdarzenie submit, ktore osdwieza przegladarke
		let text_value = document.querySelector("#textarea").value;
		//console.log(text_value);
		if (text_value != ""){ 
		add_task(text_value); 				// Wywolaj funkcje add_task
		document.querySelector("#textarea").value = "";					// Ustaw wartosc textarea na pusta
		}
	}); 
	

	// Usuwanie istniejacego zadania
		
	function delete_task(e)
	{	
		const task_to_delete = e.target.closest(".new-task");

		if (e.target.closest('.x-button') !== null) {
			task_to_delete.remove();
	}}	
	
	task_list.addEventListener("click", delete_task);
	
	
	// Edycja istniejacego zadania
		
	function edit_task(e) {	

		const task_to_edit = e.target.closest(".task-text");
		const edit_button = e.target.closest(".edit-button");
		const end_edit = e.target.closest(".end-editing-button");


		if (edit_button !== null) {
			task_to_edit.contentEditable = true;
			const end_editing_button = document.createElement("button");
			end_editing_button.innerText = "Gotowe";
			end_editing_button.classList.add("end-editing-button");
			task_to_edit.appendChild(end_editing_button);
			task_to_edit.style.backgroundColor = "#e9e9e9";
			edit_button.disabled = true;
		}
		if (end_edit !== null) {
			task_to_edit.contentEditable = false;
			task_to_edit.style.backgroundColor = "white";
			e.target.previousElementSibling.disabled = false;
			end_edit.remove();
			
		}
	}	
	
	function end_editing(e) {
		
		if (e.target.closest(".end-editing-button") !== null) {
			task_to_edit.contentEditable = false;
		}
	}
	
	task_list.addEventListener("click", edit_task);
	
	
	//	Wyszukiwanie istniejacego zadania	
	function search(input)
	{
		let my_tab = document.querySelectorAll(".task-text");					// Pobieram wszystkie teksty z zadan
		let my_new_task = document.querySelectorAll(".new-task");
		
		
		for (i=0; i < my_new_task.length; i++) { 
			if(input.length == 0) {													// jesli input jest pusty to odkryj wszystkie zadania
				my_new_task[i].classList.remove("hidden");
			}
			if(my_new_task[i].classList.contains("hidden")) {
				my_new_task[i].classList.remove("hidden");
			}
			if (my_tab[i].innerText.indexOf(input) == -1 && input.length >= 3) 		// indexOf - przeszukaj zadanie wyszukując słowo z (input). Jesli przeszukasz zadanie i jego tekst jest rowny -1 (co oznacza ze nie istnieje) i ilosc wyszukiwanych znakow > 3 
			{
				my_new_task[i].classList.add("hidden");							//	Part III - wybranym elementom dodaje klase hidden, dzieki czemu staja sie niewidoczne
				
			}
		}
	}
	
	add_task("Skończyć projekt nowej aplikacji");
	
	const button_szukaj = document.querySelector("#search_button");

	button_szukaj.addEventListener("click", function()
	{ 	
		search(document.getElementById("serach2").value);
	})
});


