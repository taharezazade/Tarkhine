import { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What makes your food fresh?",
    answer:
      "All meals are prepared daily using fresh, locally sourced ingredients.",
  },
  {
    id: 2,
    question: "Do you offer healthy food options?",
    answer:
      "Yes, we provide balanced and nutritious meals suitable for healthy lifestyles.",
  },
  {
    id: 3,
    question: "How is your coffee prepared?",
    answer:
      "Our coffee is brewed from freshly ground beans by professional baristas.",
  },
  {
    id: 4,
    question: "Do you have vegan or plant-based options?",
    answer: "Yes, we offer a variety of vegan meals and plant-based drinks.",
  },
  {
    id: 5,
    question: "Are desserts made in-house?",
    answer: "All desserts are handcrafted daily using natural ingredients.",
  },
];

function FrequentlyAskedQuestions() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full lg:w-1/2 px-4 lg:px-0">
      <div className="max-w-4xl mx-auto px-0">
        <h2 className="mb-10 text-3xl sm:text-4xl font-extrabold text-secondary">
          Food & Drinks – FAQ
        </h2>

        <div className="space-y-4">
          {faqData.map(({ id, question, answer }) => {
            const isOpen = openId === id;

            return (
              <div key={id}>
                <button
                  onClick={() => toggleFAQ(id)}
                  className="w-full text-left p-3 font-medium bg-base-300 rounded-2xl text-white flex justify-between items-center">
                  {question}
                  <span className="text-secondary">{isOpen ? "−" : "+"}</span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                  <p className="p-3 text-gray-500">{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FrequentlyAskedQuestions;
