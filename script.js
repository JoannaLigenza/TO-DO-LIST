
document.addEventListener('DOMContentLoaded', function() {
	let form_value = "";
	let submit_btn = document.querySelector("#submit");
	let task_list = document.querySelector("#task-list");

	// Dodawanie nowego zadania
	function add_task(form_value)
	{
		let date = new Date();
		let dateText = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() + ' godz.: ' + date.getHours() + ':' + date.getMinutes();
		
		// Dodawanie nowego diva z elementami zadaniowymi
		const new_task = document.createElement("div");
		new_task.classList.add("new-task");
		new_task.classList.add("hidden");								//	Part I - Dodaje klase, ktora nie istnieje
		
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
		
		// Dodawanie tresci zadania
		const task_text = document.createElement("div");
		task_text.classList.add("task-text");
		task_text.innerText = form_value;
		
		// Wrzucanie h3 i x-buttona do diva task-header
		task_header.appendChild(h3);
		task_header.appendChild(x_button);
		
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
		let task_to_delete = e.target.closest(".new-task");
		
		if (e.target.closest('.x-button') !== null) {
			task_to_delete.remove();
	}}	

	
	task_list.addEventListener("click", delete_task);
	
	
	
	//	Wyszukiwanie istniejacego zadania	
	function search(input)
	{
		//let input = document.querySelector(".serach2").value;
		let my_tab = document.querySelectorAll(".task-text");					// Pobieram wszystkie teksty z zadan
		let my_new_task = document.querySelectorAll(".new-task");
		//let search_result = document.querySelector("#search_result");
		
		var sheet = document.createElement('style')								//	Part II - definiuje klase, ktora wczesniej nie istniala. Kazdy dodany wczesniej element w js i elementy statyczne w html ja posiadaja (tylko wczesniej nie byla zdefiniowana, wiec z niej nie korzystaly)
		sheet.innerHTML = ".hidden {display: none;}";							//  klasa hidden zyskuje display none, wiec wszystkie elementy (taski-zadania) zostaja ukryte
		document.head.appendChild(sheet);										//  dodaje klase do dokumentu w sekcji head
		
		for (i=0; i < my_tab.length; i++) { 
			if (my_tab[i].innerText.indexOf(input) != -1 && input.length >= 3) 		// indexOf - przeszukaj zadanie wyszukując słowo z (input). Jesli przeszukasz zadanie i jego tekst nie jest rowny -1 (co oznacza ze nie istnieje) i ilosc wyszukiwanych znakow > 3 
			{
				my_new_task[i].classList.remove("hidden");							//	Part III - wybranym elementom usuwam klase hidden, dzieki czemu staja sie widoczne
				
			}
		}
	}
	
	//add_task("Zrobić pranie");
	add_task("Skończyć projekt nowej aplikacji");
	
	let button_szukaj = document.querySelector("#search_button");
	
	button_szukaj.addEventListener("click", function()
	{ 	
		search(document.querySelector(".serach2").value);
	})
});


