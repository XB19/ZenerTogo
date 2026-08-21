import { useState } from 'react';

function Accordion({ items, allowMultiple = false }) {
  const [openIds, setOpenIds] = useState(() => (items[0] ? [items[0].id] : []));

  const toggle = (id) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);

      if (allowMultiple) {
        return isOpen ? current.filter((openId) => openId !== id) : [...current, id];
      }

      return isOpen ? [] : [id];
    });
  };

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div className={`accordion-item${isOpen ? ' open' : ''}`} key={item.id}>
            <button
              type="button"
              id={buttonId}
              className="accordion-question"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              {item.question}
              <i className="fa-solid fa-chevron-down"></i>
            </button>

            <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion-answer">
              <div className="accordion-answer-inner">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
