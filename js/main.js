/* =====================================================
   CAMPO DE BUSCA
===================================================== */

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchInput.value = "";

    }

});


/* =====================================================
   BOTÃO DE NOTIFICAÇÕES
===================================================== */

const notificationButton = document.querySelector(".notification-button");

const notificationsPanel = document.querySelector(".notifications-panel");

notificationButton.addEventListener("click", () => {
  
  notificationsPanel.classList.toggle("show");

});

document.addEventListener("click", (event) => {

  const clickedButton = notificationButton.contains(event.target);

  const clickedPanel = notificationsPanel.contains(event.target);

  if (!clickedButton && !clickedPanel) {
    notificationsPanel.classList.remove("show");
    
  }
});

/* =====================================================
   FILTRO DO GRÁFICO
===================================================== */

const selectButton = document.querySelector(".select-button");

const selectOptions = document.querySelector(".select-options");

const filterOptions = document.querySelectorAll(".select-options li");

const selectButtonText = document.querySelector(".select-button-text");

selectButton.addEventListener("click", () => {

  selectOptions.classList.toggle("show");
});

document.addEventListener("click", (event) => {

  const clickedButton = selectButton.contains(event.target);

  const clickedOptions = selectOptions.contains(event.target);

  if (!clickedButton && !clickedOptions) {

    selectOptions.classList.remove("show");
  }
});

filterOptions.forEach((option) => {

  option.addEventListener("click", (event) => {
    
    const selectedOption = event.target;

    const selectedPeriod = selectedOption.textContent;
    
    let periodKey = "";

    if (selectedPeriod === "Hoje") {

      periodKey = "hoje";

    } else if (selectedPeriod === "Esta semana") {

      periodKey = "semana";
      
    } else if (selectedPeriod === "Este mês") {

      periodKey = "mes";
      
    } else if (selectedPeriod === "Este ano") {

      periodKey = "ano";
    }

    const selectedData = performanceData[periodKey];

    chart.data.labels = selectedData.labels;

    chart.data.datasets[0].data = selectedData.data;

    chart.update();

    selectButtonText.textContent = selectedPeriod;

    selectOptions.classList.remove("show");
  });
});

/* =====================================================
   GRÁFICO DE DESEMPENHO DE VENDAS
===================================================== */


const performanceData = {

  hoje: {
    
    labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
    
    data: [20, 35, 28, 45, 60, 52],
  },

  semana: {

    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],

    data: [120, 180, 150, 220, 300, 280, 340],
  },

  mes: {

    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],

    data: [580, 720, 650, 810],
  },

  ano: {

    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    

    data: [
      1200, 1450, 1320, 1680, 1900, 2100, 1850, 2300, 2500, 2700, 2900, 3200,
    ],
    
  },
};

const salesChart = document.querySelector("#salesChart");

const chart = new Chart(salesChart, {

  type: "line",

  data: {

    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],

    datasets: [

      {
        label: "Vendas",

        data: [120, 180, 150, 220, 300, 280],

        borderColor: "#4F7DFF",

        backgroundColor: "rgba(79, 125, 255, 0.2)",

        borderWidth: 3,

        tension: 0.4,

        fill: true,
      },
    ],
  },

  options: {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        display: false,
      },
    },

    scales: {

      x: {

        ticks: {

          color: "#CBD5E1",
        },

        grid: {

          display: false,
        },
      },

      y: {

        ticks: {

          color: "#CBD5E1",
        },

        grid: {

          color: "rgba(203, 213, 225, 0.08)",
        },

        border: {

          display: false,
        },

        beginAtZero: true,
      },
    },
  },
});

/* =====================================================
   PEDIDOS RECENTES
===================================================== */

const orders = [

  {
    id: 1024, 
    client: "Mayra", 
    status: "Pago", 
    total: 189, 
  },

  {
    id: 1025, 
    client: "João", 
    status: "Pendente", 
    total: 79, 
  },

  {
    id: 1026, 
    client: "Ana", 
    status: "Cancelado",
    total: 230, 
  },

  {
    id: 1027, 
    client: "Carlos", 
    status: "Pago", 
    total: 420, 
  },
];

const ordersTableBody = document.querySelector(".orders-table-body");

const editModal = document.querySelector(".edit-modal");

const editForm = document.querySelector(".edit-form");

const clientInput = document.querySelector("#editClient");

const statusInput = document.querySelector("#editStatus");

const totalInput = document.querySelector("#editTotal");

const cancelButton = document.querySelector(".cancel-button");

const deleteModal = document.querySelector(".delete-modal");

const deleteCancelButton = document.querySelector(".delete-cancel-button");

const deleteConfirmButton = document.querySelector(".delete-confirm-button");

let orderToDelete = null;

cancelButton.addEventListener("click", () => {

  editModal.classList.remove("show");

  document.body.style.overflow = "";
});

deleteCancelButton.addEventListener("click", () => {

  deleteModal.classList.remove("show");

  document.body.style.overflow = "";

  orderToDelete = null;
});

deleteConfirmButton.addEventListener("click", () => {

  const orderIndex = orders.findIndex((order) => {

  return order.id === orderToDelete.id;
  });

  orders.splice(orderIndex, 1);

  renderOrders();

  deleteModal.classList.remove("show");

  document.body.style.overflow = "";

  orderToDelete = null;

});

let editingOrder = null;

editForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const newClient = clientInput.value;

  const newStatus = statusInput.value;

  const newTotal = Number(totalInput.value);

  editingOrder.client = newClient;

  editingOrder.status = newStatus;

  editingOrder.total = newTotal;

  renderOrders();

  editModal.classList.remove("show");

  document.body.style.overflow = "";
});

function renderOrders() {

  ordersTableBody.innerHTML = "";

  orders.forEach((order) => {

    let statusClass = "";

    if (order.status === "Pago") {

      statusClass = "success";
      
    } else if (order.status === "Pendente") {

      statusClass = "warning";

    } else {

      statusClass = "danger";
    }

    ordersTableBody.innerHTML += `

    <tr> 

      <td>#${order.id}</td> 

      <td>${order.client}</td>

      <td>

        <span class="status ${statusClass}">

          ${order.status}

        </span>

      </td>

      <td>R$ ${order.total}</td>

      <td class="actions-column">

        <button
          type="button"
          class="edit-button"
          data-id="${order.id}">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>

          Editar

        </button>

        <button
          type="button"
          class="delete-button"
          data-id="${order.id}">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>

          Excluir

        </button>

      </td>

    </tr>

  `;
  });
}

renderOrders();

ordersTableBody.addEventListener("click", (event) => {
  

  const editButton = event.target.closest(".edit-button");

  if (editButton) {

  const orderId = Number(editButton.dataset.id);

  const orderIndex = orders.findIndex((order) => {

    return order.id === orderId;
    
  });

  const order = orders[orderIndex];

  editingOrder = order;

  clientInput.value = order.client;

  statusInput.value = order.status;

  totalInput.value = order.total;

  editModal.classList.add("show");
  
  document.body.style.overflow = "hidden";
  
  }

  else{

  const deleteButton = event.target.closest(".delete-button");

  if (!deleteButton) {
    return;
  }

  const orderId = Number(deleteButton.dataset.id);

  const orderIndex = orders.findIndex((order) => {

    return order.id === orderId;
    
  });

  orderToDelete = orders[orderIndex];

  deleteModal.classList.add("show");

  document.body.style.overflow = "hidden";
  
  }
});

