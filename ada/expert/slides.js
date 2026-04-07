const SLIDES = [
  {
    id: 1,
    type: "cover",
    badge: "GRASP · Patrones de Asignación de Responsabilidades",
    title: "Expert",
    subtitle: "¿Quién debe saber qué?",
    icon: "fa-solid fa-brain",
    note: "Principio fundamental del diseño orientado a objetos"
  },
  {
    id: 2,
    type: "concept",
    label: "El Principio",
    title: "¿Qué es <span class='accent'>Expert</span>?",
    icon: "fa-solid fa-lightbulb",
    content: `
      <div class="concept-box">
        <div class="concept-question">
          <i class="fa-solid fa-circle-question"></i>
          <strong>Problema</strong>
          <p>¿Cuál es el principio más básico para asignar responsabilidades en un diseño orientado a objetos?</p>
        </div>
        <div class="concept-answer">
          <i class="fa-solid fa-circle-check"></i>
          <strong>Solución</strong>
          <p>Asignar la responsabilidad al <span class='highlight'>experto en información</span>: la clase que tiene la información necesaria para cumplir con esa responsabilidad.</p>
        </div>
      </div>
      <div class="intuition-box animate__animated animate__fadeInUp animate__delay-1s">
        <i class="fa-solid fa-quote-left"></i>
        <em>"Los objetos hacen cosas relacionadas con la información que tienen."</em>
      </div>
    `
  },
  {
    id: 3,
    type: "context",
    label: "Contexto",
    title: "App de <span class='accent'>Punto de Venta</span>",
    icon: "fa-solid fa-cash-register",
    content: `
      <div class="row g-4 align-items-center">
        <div class="col-md-6">
          <p class="lead-text">Tenemos una aplicación que genera tickets de venta. Un ticket simplificado luce así:</p>
          <div class="ticket-preview">
            <div class="ticket-header">
              <i class="fa-solid fa-receipt"></i> Ticket de Venta
            </div>
            <div class="ticket-body">
              <div class="ticket-line"><span class="ticket-meta">Fecha:</span> 31/3/2021</div>
              <div class="ticket-line"><span class="qty">2</span> de <span class="prod">'Agua mineral'</span> a <span class="price">$25</span></div>
              <div class="ticket-line"><span class="qty">1</span> de <span class="prod">'Café cortado'</span> a <span class="price">$35</span></div>
              <div class="ticket-line"><span class="qty">1</span> de <span class="prod">'Café expreso'</span> a <span class="price">$31</span></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <p class="lead-text">⚠️ <strong>Importante:</strong> comenzar enunciando las responsabilidades claramente antes de asignarlas.</p>
          <div class="info-card">
            <h6><i class="fa-solid fa-id-card"></i> Tarjetas CRC</h6>
            <p>Usamos tarjetas <strong>CRC</strong> (Clases · Responsabilidades · Colaboraciones) para visualizar el diseño.</p>
            <div class="crc-diagram">
              <div class="crc-name">NombreClase</div>
              <div class="crc-body">
                <div class="crc-resp">Responsabilidades</div>
                <div class="crc-collab">Colaboraciones</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 4,
    type: "crc",
    label: "Diseño Inicial",
    title: "Tarjetas <span class='accent'>CRC</span> de Partida",
    icon: "fa-solid fa-diagram-project",
    content: `
      <p class="lead-text">Las clases que ya existen en la aplicación de punto de venta:</p>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="crc-card animate__animated animate__fadeInLeft">
            <div class="crc-card-name"><i class="fa-solid fa-file-invoice"></i> SaleTicket</div>
            <div class="crc-card-body">
              <div class="crc-card-resp">
                <h6>Responsabilidades</h6>
                <ul>
                  <li>Conocer fecha y hora</li>
                  <li>Conocer líneas de ítems vendidos</li>
                  <li>Imprimir el ticket</li>
                </ul>
              </div>
              <div class="crc-card-collab">
                <h6>Colabora con</h6>
                <ul><li>TicketLineItem</li></ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="crc-card animate__animated animate__fadeInUp">
            <div class="crc-card-name"><i class="fa-solid fa-list-check"></i> TicketLineItem</div>
            <div class="crc-card-body">
              <div class="crc-card-resp">
                <h6>Responsabilidades</h6>
                <ul>
                  <li>Conocer la cantidad del producto</li>
                  <li>Conocer el producto</li>
                </ul>
              </div>
              <div class="crc-card-collab">
                <h6>Colabora con</h6>
                <ul><li>ProductSpecification</li></ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="crc-card animate__animated animate__fadeInRight">
            <div class="crc-card-name"><i class="fa-solid fa-box"></i> ProductSpecification</div>
            <div class="crc-card-body">
              <div class="crc-card-resp">
                <h6>Responsabilidades</h6>
                <ul>
                  <li>Conocer la descripción</li>
                  <li>Conocer el precio</li>
                </ul>
              </div>
              <div class="crc-card-collab">
                <h6>Colabora con</h6>
                <ul><li class="text-muted fst-italic">ninguna</li></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relation-arrows mt-3">
        <span class="badge-class">SaleTicket</span>
        <i class="fa-solid fa-arrow-right"></i>
        <span class="badge-class">TicketLineItem</span>
        <i class="fa-solid fa-arrow-right"></i>
        <span class="badge-class">ProductSpecification</span>
      </div>
    `
  },
  {
    id: 5,
    type: "code",
    label: "Código C#",
    title: "Las clases en <span class='accent'>C#</span>",
    icon: "fa-solid fa-code",
    content: `
      <div class="code-tabs">
        <ul class="nav nav-tabs code-nav" id="codeTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-sale" type="button">SaleTicket</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-line" type="button">TicketLineItem</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-prod" type="button">ProductSpecification</button>
          </li>
        </ul>
        <div class="tab-content code-tab-content">
          <div class="tab-pane fade show active" id="tab-sale">
<pre><code class="language-csharp"><span class="kw">public class</span> <span class="cl">SaleTicket</span>
{
    <span class="kw">private</span> ArrayList lineItems = <span class="kw">new</span> ArrayList();

    <span class="kw">public</span> DateTime DateTime { <span class="kw">get</span>; <span class="kw">set</span>; }

    <span class="kw">public void</span> <span class="mt">AddLineItem</span>(TicketLineItem item)
        => lineItems.Add(item);

    <span class="kw">public void</span> <span class="mt">RemoveLineItem</span>(TicketLineItem item)
        => lineItems.Remove(item);

    <span class="kw">public void</span> <span class="mt">PrintTicket</span>()
    {
        Console.WriteLine(<span class="st">$"Fecha: {</span>DateTime<span class="st">}"</span>);
        <span class="kw">foreach</span> (TicketLineItem item <span class="kw">in</span> lineItems)
        {
            Console.WriteLine(<span class="st">$"{</span>item.Quantity<span class="st">} de '{</span>item.Product.Description<span class="st">}' a ${</span>item.Product.Price<span class="st">}"</span>);
        }
    }
}</code></pre>
          </div>
          <div class="tab-pane fade" id="tab-line">
<pre><code class="language-csharp"><span class="kw">public class</span> <span class="cl">TicketLineItem</span>
{
    <span class="kw">public</span> <span class="mt">TicketLineItem</span>(<span class="kw">double</span> quantity, ProductSpecification product)
    {
        Quantity = quantity;
        Product = product;
    }

    <span class="kw">public double</span> Quantity { <span class="kw">get</span>; <span class="kw">set</span>; }

    <span class="kw">public</span> ProductSpecification Product { <span class="kw">get</span>; <span class="kw">set</span>; }
}</code></pre>
          </div>
          <div class="tab-pane fade" id="tab-prod">
<pre><code class="language-csharp"><span class="kw">public class</span> <span class="cl">ProductSpecification</span>
{
    <span class="kw">public</span> <span class="mt">ProductSpecification</span>(<span class="kw">string</span> description, <span class="kw">double</span> price)
    {
        Description = description;
        Price = price;
    }

    <span class="kw">public string</span> Description { <span class="kw">get</span>; <span class="kw">set</span>; }

    <span class="kw">public double</span> Price { <span class="kw">get</span>; <span class="kw">set</span>; }
}</code></pre>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 6,
    type: "problem",
    label: "Aplicando Expert",
    title: "¿Quién calcula el <span class='accent'>Total</span>?",
    icon: "fa-solid fa-magnifying-glass",
    content: `
      <div class="row g-4">
        <div class="col-md-6">
          <div class="problem-box">
            <h5><i class="fa-solid fa-circle-question"></i> El problema</h5>
            <p>Queremos agregar el <strong>total de la venta</strong> al ticket. ¿Qué clase debe tener esa responsabilidad?</p>
            <div class="formula-box">
              <div class="formula-line">
                <span class="formula-label">Total</span>
                <span class="formula-op">=</span>
                <span class="formula-val">Σ subtotales de líneas</span>
              </div>
              <div class="formula-line">
                <span class="formula-label">Subtotal línea</span>
                <span class="formula-op">=</span>
                <span class="formula-val">cantidad × precio</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="analysis-box">
            <h5><i class="fa-solid fa-microscope"></i> Aplicando Expert</h5>
            <div class="analysis-step">
              <span class="step-num">1</span>
              <p>¿Qué información se necesita? → Todas las instancias de <code>TicketLineItem</code> y la suma de sus subtotales.</p>
            </div>
            <div class="analysis-step">
              <span class="step-num">2</span>
              <p>¿Quién tiene esa información? → Solo <code>SaleTicket</code> conoce todas sus líneas.</p>
            </div>
            <div class="analysis-step highlight-step">
              <span class="step-num">✓</span>
              <p><strong>Conclusión:</strong> <code>SaleTicket</code> es el experto de información → asignamos <code>Total</code> a <code>SaleTicket</code>.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 7,
    type: "code",
    label: "Solución Paso 1",
    title: "<span class='accent'>SaleTicket.Total</span> — Primera mejora",
    icon: "fa-solid fa-code-branch",
    content: `
      <p class="lead-text">Agregamos la propiedad <code>Total</code> (solo lectura) a <code>SaleTicket</code> y actualizamos <code>PrintTicket()</code>:</p>
      <div class="code-with-diff">
<pre><code class="language-csharp"><span class="kw">public class</span> <span class="cl">SaleTicket</span>
{
    <span class="diff-add">+   <span class="kw">public double</span> Total</span>
    <span class="diff-add">+   {</span>
    <span class="diff-add">+       <span class="kw">get</span></span>
    <span class="diff-add">+       {</span>
    <span class="diff-add">+           <span class="kw">double</span> result = 0;</span>
    <span class="diff-add">+           <span class="kw">foreach</span> (TicketLineItem item <span class="kw">in</span> lineItems)</span>
    <span class="diff-add">+               result += item.Quantity * item.Product.Price;</span>
    <span class="diff-add">+           <span class="kw">return</span> result;</span>
    <span class="diff-add">+       }</span>
    <span class="diff-add">+   }</span>

        <span class="kw">public void</span> <span class="mt">PrintTicket</span>()
        {
            Console.WriteLine(<span class="st">$"Fecha: {</span>DateTime<span class="st">}"</span>);
            <span class="kw">foreach</span> (TicketLineItem item <span class="kw">in</span> lineItems)
                Console.WriteLine(<span class="st">$"{</span>item.Quantity<span class="st">} de '{</span>item.Product.Description<span class="st">}' a ${</span>item.Product.Price<span class="st">}"</span>);
    <span class="diff-add">+       Console.WriteLine(<span class="st">$"Total: ${</span>Total<span class="st">}"</span>);</span>
        }
}</code></pre>
      </div>
      <div class="output-preview">
        <div class="output-header"><i class="fa-solid fa-terminal"></i> Salida</div>
        <div class="output-body">
          <div>Fecha: 31/3/2021</div>
          <div>2 de 'Agua mineral' a $25</div>
          <div>1 de 'Café cortado' a $35</div>
          <div>1 de 'Café expreso' a $31</div>
          <div class="output-new">Total: $116</div>
        </div>
      </div>
      <div class="note-box">
        <i class="fa-solid fa-info-circle"></i>
        <span>Implementamos <code>Total</code> como <strong>propiedad de solo lectura</strong> porque cambia solo cuando se agregan/quitan líneas, no tiene sentido asignarla directamente.</span>
      </div>
    `
  },
  {
    id: 8,
    type: "code",
    label: "Solución Paso 2",
    title: "<span class='accent'>TicketLineItem.SubTotal</span> — Segunda mejora",
    icon: "fa-solid fa-layer-group",
    content: `
      <p class="lead-text">La información para el subtotal de una línea (<em>cantidad × precio</em>) ya está en <code>TicketLineItem</code>. ¡También es experto parcial!</p>
      <div class="row g-3">
        <div class="col-md-6">
<pre><code class="language-csharp"><span class="kw">public class</span> <span class="cl">TicketLineItem</span>
{
    <span class="comment">// ... código anterior ...</span>

    <span class="diff-add">+   <span class="kw">public double</span> SubTotal</span>
    <span class="diff-add">+   {</span>
    <span class="diff-add">+       <span class="kw">get</span> => Quantity * Product.Price;</span>
    <span class="diff-add">+   }</span>
}</code></pre>
        </div>
        <div class="col-md-6">
<pre><code class="language-csharp"><span class="kw">public class</span> <span class="cl">SaleTicket</span>
{
    <span class="kw">public double</span> Total
    {
        <span class="kw">get</span>
        {
            <span class="kw">double</span> result = 0;
            <span class="kw">foreach</span> (TicketLineItem item <span class="kw">in</span> lineItems)
            {
    <span class="diff-rem">-               result += item.Quantity * item.Product.Price;</span>
    <span class="diff-add">+               result += item.SubTotal;</span>
            }
            <span class="kw">return</span> result;
        }
    }
}</code></pre>
        </div>
      </div>
      <div class="expert-flow mt-3">
        <div class="expert-node"><i class="fa-solid fa-file-invoice"></i><br>SaleTicket<br><small>calcula Total</small></div>
        <div class="expert-arrow"><i class="fa-solid fa-arrow-right"></i> delega</div>
        <div class="expert-node"><i class="fa-solid fa-list-check"></i><br>TicketLineItem<br><small>calcula SubTotal</small></div>
        <div class="expert-arrow"><i class="fa-solid fa-arrow-right"></i> usa</div>
        <div class="expert-node"><i class="fa-solid fa-box"></i><br>ProductSpecification<br><small>conoce Price</small></div>
      </div>
    `
  },
  {
    id: 9,
    type: "benefits",
    label: "Beneficios",
    title: "<span class='accent'>Beneficios</span> de Expert",
    icon: "fa-solid fa-star",
    content: `
      <div class="row g-4">
        <div class="col-md-4">
          <div class="benefit-card animate__animated animate__fadeInLeft">
            <div class="benefit-icon"><i class="fa-solid fa-lock"></i></div>
            <h5>Encapsulación</h5>
            <p>Los objetos usan su <strong>propia información</strong> para cumplir responsabilidades. El estado interno está protegido.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="benefit-card animate__animated animate__fadeInUp">
            <div class="benefit-icon"><i class="fa-solid fa-link-slash"></i></div>
            <h5>Bajo Acoplamiento</h5>
            <p>Menor dependencia entre clases produce programas <strong>más robustos y fáciles de mantener</strong>.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="benefit-card animate__animated animate__fadeInRight">
            <div class="benefit-icon"><i class="fa-solid fa-puzzle-piece"></i></div>
            <h5>Alta Cohesión</h5>
            <p>El comportamiento se distribuye a clases con la información necesaria → clases <strong>más cohesivas y comprensibles</strong>.</p>
          </div>
        </div>
      </div>
      <div class="summary-banner mt-4">
        <i class="fa-solid fa-trophy"></i>
        Expert es el patrón GRASP <strong>más utilizado</strong>. Expresa la intuición de que los objetos hacen cosas relacionadas con la información que tienen.
      </div>
    `
  }
];
