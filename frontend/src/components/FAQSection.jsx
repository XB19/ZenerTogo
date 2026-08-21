import Accordion from './Accordion.jsx';

function FAQSection({ title, items, allowMultiple = false }) {
  if (items.length === 0) return null;

  return (
    <div className="faq-block">
      {title && <h2 className="faq-block-title">{title}</h2>}
      <Accordion items={items} allowMultiple={allowMultiple} />
    </div>
  );
}

export default FAQSection;
