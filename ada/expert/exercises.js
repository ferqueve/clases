const EXERCISES = [
  {
    id: 1,
    title: "Sistema de Biblioteca",
    icon: "fa-solid fa-book-open",
    difficulty: "Básico",
    difficultyClass: "easy",
    context: `
      <p>Una biblioteca tiene las siguientes clases:</p>
      <div class="row g-2 mb-3">
        <div class="col-md-4">
          <div class="mini-crc">
            <div class="mini-crc-name">Loan</div>
            <ul><li>Conocer fecha de préstamo</li><li>Conocer fecha de devolución esperada</li><li>Conocer el libro</li><li>Conocer el socio</li></ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mini-crc">
            <div class="mini-crc-name">Book</div>
            <ul><li>Conocer título</li><li>Conocer autor</li><li>Conocer ISBN</li></ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mini-crc">
            <div class="mini-crc-name">Member</div>
            <ul><li>Conocer nombre</li><li>Conocer nro. de socio</li></ul>
          </div>
        </div>
      </div>
      <p>La multa se calcula como: <strong>días de atraso × $5 por día</strong>.</p>
      <p>La fecha de devolución real se captura al momento de devolver el libro.</p>
    `,
    question: "¿A qué clase le asignás la responsabilidad de <strong>calcular la multa por atraso</strong>? Justificá usando Expert.",
    options: [
      { id: "a", text: "Book — porque es el recurso que se prestó." },
      { id: "b", text: "Loan — porque tiene la fecha de vencimiento y puede recibir la fecha de devolución real." },
      { id: "c", text: "Member — porque es quien paga la multa." },
      { id: "d", text: "Una nueva clase FineCalculator, especializada en cálculos." }
    ],
    correct: "b",
    explanation: `
      <p>✅ <strong>Loan</strong> es el experto de información correcto porque:</p>
      <ul>
        <li>Conoce la <strong>fecha de vencimiento</strong> del préstamo.</li>
        <li>Puede recibir la <strong>fecha real de devolución</strong> como parámetro.</li>
        <li>Con esos dos datos puede calcular los días de atraso y multiplicar por la tarifa.</li>
      </ul>
      <p><code>Book</code> no sabe nada sobre fechas. <code>Member</code> solo conoce datos del socio. <code>FineCalculator</code> es una clase artificiosa: crearía acoplamiento innecesario y violaría la cohesión natural del diseño.</p>
    `,
    codeSnippet: `public class Loan
{
    public DateTime DueDate { get; set; }
    public Book Book { get; set; }
    public Member Member { get; set; }

    // ✅ Loan es el experto: tiene DueDate
    public double CalculateFine(DateTime returnDate)
    {
        int daysLate = (returnDate - DueDate).Days;
        return daysLate > 0 ? daysLate * 5.0 : 0;
    }
}`
  },
  {
    id: 2,
    title: "Sistema de E-Commerce",
    icon: "fa-solid fa-cart-shopping",
    difficulty: "Intermedio",
    difficultyClass: "medium",
    context: `
      <p>Un sistema de e-commerce tiene estas clases:</p>
      <div class="row g-2 mb-3">
        <div class="col-md-3">
          <div class="mini-crc">
            <div class="mini-crc-name">Order</div>
            <ul><li>Conocer items del pedido</li><li>Conocer fecha</li><li>Conocer cliente</li></ul>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mini-crc">
            <div class="mini-crc-name">OrderItem</div>
            <ul><li>Conocer cantidad</li><li>Conocer producto</li></ul>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mini-crc">
            <div class="mini-crc-name">Product</div>
            <ul><li>Conocer nombre</li><li>Conocer precio</li><li>Conocer peso (kg)</li></ul>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mini-crc">
            <div class="mini-crc-name">Customer</div>
            <ul><li>Conocer nombre</li><li>Conocer dirección</li></ul>
          </div>
        </div>
      </div>
      <p>El peso total de un pedido es la suma de: <strong>peso del producto × cantidad</strong> por cada item.</p>
    `,
    question: "Identificá los <strong>expertos parciales</strong> y asigná correctamente las responsabilidades para calcular el peso total del pedido.",
    options: [
      { id: "a", text: "Order calcula el total. No hay expertos parciales porque toda la lógica está en un lugar." },
      { id: "b", text: "OrderItem calcula el peso de su línea (peso parcial). Order suma todos los pesos parciales (peso total)." },
      { id: "c", text: "Product calcula el peso total, porque conoce el peso unitario." },
      { id: "d", text: "Customer calcula el peso total, porque necesita saber cuánto le llega." }
    ],
    correct: "b",
    explanation: `
      <p>✅ Hay <strong>dos expertos parciales</strong>:</p>
      <ul>
        <li><strong>OrderItem</strong>: conoce la <em>cantidad</em> y el <em>Product</em> (que tiene el peso unitario). Es experto del peso de esa línea → <code>double ItemWeight { get => Quantity * Product.Weight; }</code></li>
        <li><strong>Order</strong>: conoce todos los <em>OrderItem</em>. Es experto del total → suma todos los <code>ItemWeight</code>.</li>
      </ul>
      <p>La opción A concentra todo en <code>Order</code>, lo que viola la cohesión. <code>Product</code> y <code>Customer</code> no tienen la información completa.</p>
    `,
    codeSnippet: `// Experto parcial: conoce cantidad y producto
public class OrderItem
{
    public int Quantity { get; set; }
    public Product Product { get; set; }

    public double ItemWeight => Quantity * Product.Weight;
}

// Experto total: conoce todos los items
public class Order
{
    private List<OrderItem> items = new List<OrderItem>();

    public double TotalWeight
    {
        get
        {
            double total = 0;
            foreach (var item in items)
                total += item.ItemWeight;  // delega en experto parcial
            return total;
        }
    }
}`
  },
  {
    id: 3,
    title: "Completar el Código",
    icon: "fa-solid fa-keyboard",
    difficulty: "Avanzado",
    difficultyClass: "hard",
    context: `
      <p>Tenés un sistema de facturación con estas clases ya implementadas:</p>
<pre><code class="language-csharp"><span class="kw">public class</span> <span class="cl">Invoice</span>
{
    <span class="kw">private</span> List&lt;InvoiceLine&gt; lines = <span class="kw">new</span>();
    <span class="kw">public</span> Customer Customer { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> DateTime Date { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public void</span> AddLine(InvoiceLine line) => lines.Add(line);

    <span class="comment">// ❓ FALTA IMPLEMENTAR</span>
    <span class="kw">public double</span> Total { <span class="kw">get</span>; }
}

<span class="kw">public class</span> <span class="cl">InvoiceLine</span>
{
    <span class="kw">public</span> Item Item { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public int</span> Quantity { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public double</span> Discount { <span class="kw">get</span>; <span class="kw">set</span>; } <span class="comment">// porcentaje 0-100</span>

    <span class="comment">// ❓ FALTA IMPLEMENTAR</span>
    <span class="kw">public double</span> LineTotal { <span class="kw">get</span>; }
}

<span class="kw">public class</span> <span class="cl">Item</span>
{
    <span class="kw">public string</span> Name { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public double</span> UnitPrice { <span class="kw">get</span>; <span class="kw">set</span>; }
}</code></pre>
      <p class="mt-3">La fórmula del total de línea con descuento es: <strong>cantidad × precio × (1 - descuento/100)</strong></p>
    `,
    question: "Seleccioná la implementación correcta que aplica el principio Expert:",
    options: [
      {
        id: "a",
        text: "InvoiceLine.LineTotal calcula cantidad × precio sin descuento. Invoice.Total aplica el descuento al final."
      },
      {
        id: "b",
        text: "InvoiceLine.LineTotal = Quantity × Item.UnitPrice × (1 - Discount/100). Invoice.Total suma todos los LineTotal."
      },
      {
        id: "c",
        text: "Item.LineTotal(qty, disc) calcula el total de línea recibiendo parámetros. Invoice.Total llama a Item directamente."
      },
      {
        id: "d",
        text: "Invoice.Total calcula todo: itera líneas y accede a item.UnitPrice directamente para calcular cada subtotal."
      }
    ],
    correct: "b",
    explanation: `
      <p>✅ La opción B aplica Expert correctamente:</p>
      <ul>
        <li><strong>InvoiceLine</strong> conoce <code>Quantity</code>, <code>Discount</code> y <code>Item</code> (que tiene <code>UnitPrice</code>) → es el experto del total de línea con descuento.</li>
        <li><strong>Invoice</strong> conoce todas las líneas → es el experto del total general, y delega el cálculo de cada línea en <code>InvoiceLine.LineTotal</code>.</li>
      </ul>
      <p>La opción D viola Expert y cohesión: <code>Invoice</code> accede directamente a <code>item.UnitPrice</code>, asumiendo conocimiento interno de <code>Item</code>, lo que aumenta el acoplamiento.</p>
    `,
    codeSnippet: `public class InvoiceLine
{
    public Item Item { get; set; }
    public int Quantity { get; set; }
    public double Discount { get; set; }

    // ✅ InvoiceLine es experto: tiene todo lo necesario
    public double LineTotal
    {
        get => Quantity * Item.UnitPrice * (1 - Discount / 100.0);
    }
}

public class Invoice
{
    private List<InvoiceLine> lines = new();

    // ✅ Invoice delega en el experto parcial
    public double Total
    {
        get
        {
            double sum = 0;
            foreach (var line in lines)
                sum += line.LineTotal;
            return sum;
        }
    }
}`
  }
];
