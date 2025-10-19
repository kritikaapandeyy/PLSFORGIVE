// Array of forgiveness quotes
const forgivenesQuotes = [
  "Forgiveness is the fragrance that the violet sheds on the heel that has crushed it. - Mark Twain",
  "The weak can never forgive. Forgiveness is the attribute of the strong. - Mahatma Gandhi",
  "Forgiveness is not about forgetting. It is about letting go of another person's throat. - William C. Hannan",
  "To forgive is to set a prisoner free and discover that the prisoner was you. - Lewis B. Smedes",
  "Forgiveness is the final form of love. - Reinhold Niebuhr",
  "He who cannot forgive breaks the bridge over which he himself must pass. - George Herbert",
  "Forgiveness is the key that unlocks the door of resentment and the handcuffs of hate. - William Arthur Ward",
  "In forgiveness, there is freedom. - Tony Robbins",
  "Forgiveness is not weakness, it's strength. - Unknown",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
]

// Display random quote on page load and every 8 seconds
window.addEventListener("load", () => {
  displayRandomQuote()
  setInterval(displayRandomQuote, 8000) // Change quote every 8 seconds
})

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * forgivenesQuotes.length)
  const quoteDisplay = document.getElementById("quoteDisplay")
  quoteDisplay.textContent = forgivenesQuotes[randomIndex]
}

// Button to show a new quote on click
const newQuoteBtn = document.getElementById("newQuoteBtn")
newQuoteBtn.addEventListener("click", displayRandomQuote)

// Handle answer button clicks
function handleAnswer(answer) {
  const messages = {
    Yes: "💕 Thank you for forgiving!",
    "Hell yea": "🎉 You're the best!",
    "Ofc Kritika is the best": "👑 Absolutely right!",
  }

  alert(messages[answer])
}

// Handle compliment input
function handleComplimentKeypress(event) {
  if (event.key === "Enter") {
    addCompliment()
  }
}

function addCompliment() {
  const input = document.getElementById("complimentInput")
  const complimentText = input.value.trim()

  if (complimentText === "") {
    alert("Please write a compliment!")
    return
  }

  const complimentsList = document.getElementById("complimentsList")
  const complimentItem = document.createElement("div")
  complimentItem.className = "compliment-item"
  complimentItem.textContent = complimentText

  complimentsList.appendChild(complimentItem)
  input.value = ""
  input.focus()
}

// Drag and drop functionality
let draggedFlower = null

function dragStart(event) {
  draggedFlower = event.target.dataset.flower
  event.dataTransfer.effectAllowed = "copy"
}

function allowDrop(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = "copy"
  event.currentTarget.classList.add("drag-over")
}

function dropFlower(event) {
  event.preventDefault()
  event.currentTarget.classList.remove("drag-over")

  if (draggedFlower) {
    const bouquetZone = document.getElementById("bouquetZone")

    // Remove hint if this is the first flower
    const hint = bouquetZone.querySelector(".drop-hint")
    if (hint) {
      hint.remove()
    }

    const flowerElement = document.createElement("span")
    flowerElement.className = "bouquet-flower"
    flowerElement.textContent = draggedFlower

    // Start position (above vase)
    flowerElement.style.position = "absolute"
    flowerElement.style.bottom = "150px"
    flowerElement.style.left = `${Math.random() * (bouquetZone.offsetWidth - 30)}px`
    flowerElement.style.opacity = 0

    bouquetZone.appendChild(flowerElement)

    // Animate falling into the vase
    setTimeout(() => {
      flowerElement.style.transition = "all 0.8s ease-out"
      flowerElement.style.bottom = "20px"
      flowerElement.style.opacity = 1
    }, 50)
  }
}


function clearBouquet() {
  const bouquetZone = document.getElementById("bouquetZone")
  bouquetZone.innerHTML = '<p class="drop-hint">Drag flowers here to create your bouquet</p><div class="vase"></div>'
}

// Remove drag-over class when leaving the drop zone
document.addEventListener("dragleave", (event) => {
  if (event.target.id === "bouquetZone") {
    event.target.classList.remove("drag-over")
  }
})
