const input = document.querySelector("task")
const span = document.querySelector("liveToastBtn")
const liste = document.querySelector("ul")
function newElement() {
    var inputValue = document.getElementById("task").value.trim();
    let liDom = document.createElement('li');
    if(inputValue !== ""){
        var li = document.createElement("li");
        li.textContent = task.value;
        liste.appendChild(li);
        task.value= "";
        $("#lliveToast").toast('show');
    } else{
        task.value= "";
        $("#liveToastt").toast('show');
    }

    li.onclick = function() {
        this.classList.toggle("checked");
    };

    deleteBut = document.createElement("button");
    deleteBut.textContent = "X";
    deleteBut.style.position = "absolute";
    deleteBut.style.display =  "flex"
    deleteBut.style.border = "transparent";
    deleteBut.style.fontSize = "22px"
    deleteBut.style.width = "5%"
    deleteBut.style.textAlign= "center"
    deleteBut.style.justifyContent = "center"
    deleteBut.style.height = "99%"
    deleteBut.style.marginTop = "-39px"
    deleteBut.style.paddingTop = "8px";
    deleteBut.style.left = "95%"
    //deleteBut.style.borderRadius = "20px"
    deleteBut.style.backgroundColor = "transparent";
    deleteBut.addEventListener("click", function(){
        this.parentElement.remove();
        $("#liveToastDelete").toast('show');
        task.value = "";
    });

    deleteBut.addEventListener("mouseover", function(event) {
        event.target.style.backgroundColor = "#f78501";
    });
    deleteBut.addEventListener("mouseout", function(event) {
        event.target.style.backgroundColor = "transparent";
    });

    li.appendChild(deleteBut)
    document.getElementById("list").appendChild(li)

    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(inputValue);
    localStorage.setItem('items', JSON.stringify(items));
    liDom.addEventListener('click', function () {
        this.classList.toggle('checked');
    });

}

window.onload = function() {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(function(item) {
        let li = document.createElement('li');
        li.textContent = item;
        liste.appendChild(li);

        li.addEventListener('click', function () {
            this.classList.toggle('checked');
        });

        // Silme butonunu oluştur ve ekle
        let deleteBut = document.createElement("button");
        deleteBut.textContent = "X";
        deleteBut.style.position = "absolute";
        deleteBut.style.display =  "flex";
        deleteBut.style.border = "transparent";
        deleteBut.style.fontSize = "22px";
        deleteBut.style.width = "5%";
        deleteBut.style.textAlign= "center";
        deleteBut.style.justifyContent = "center";
        deleteBut.style.height = "99%";
        deleteBut.style.marginTop = "-39px";
        deleteBut.style.paddingTop = "8px";
        deleteBut.style.left = "95%";
        deleteBut.style.backgroundColor = "transparent";

        deleteBut.addEventListener("click", function(){
            this.parentElement.remove();
            $("#liveToastDelete").toast('show');

            // LocalStorage'dan öğeyi sil
            let items = JSON.parse(localStorage.getItem('items')) || [];
            const valueToRemove = item;
            const indexToRemove = items.indexOf(valueToRemove);
            if (indexToRemove !== -1) {
                items.splice(indexToRemove, 1);
                localStorage.setItem('items', JSON.stringify(items));
            }
        });

        deleteBut.addEventListener("mouseover", function(event) {
            event.target.style.backgroundColor = "#f78501";
        });

        deleteBut.addEventListener("mouseout", function(event) {
            event.target.style.backgroundColor = "transparent";
        });

        li.appendChild(deleteBut);
    });
};


document.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        newElement();
        task.value = ""
    }
})