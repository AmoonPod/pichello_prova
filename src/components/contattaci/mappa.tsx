import ScrittaPiccolina from "../scrittaPiccolina";

export default function Mappa() {
  return (
    <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
      <div className="text-center mb-12">
        <div className="space-y-2">
          <ScrittaPiccolina>Il Pichello</ScrittaPiccolina>
          <h1 className="font-extrabold text-4xl lg:text-5xl text-primary tracking-tight">
            Dove siamo
          </h1>
          <p className="text-muted-foreground text-lg container mx-auto font-light">
            Il Pichello si trova in località Marola nel comune di Carpineti. A
            differenza della maggior parte del carpinetano, che si trova nella
            valle del torrente Tresinaro (Valsecchia), il Pichello si trova sul
            versante opposto, nella valle del torrente Tassobbio (Val d’Enza).
            E’ proprio nella Valtassobbio che coltiviamo una superficie di
            300.000 metri quadri, la maggior parte di questi situati su terreni
            castagnini della formazione di Bismantova, studiata ancora oggi in
            tutto il mondo. Orgogliosi di coltivare e allevare a Marola, 810
            metri s.l.m., immersa nei castagneti e querceti della Valle
            Tassobbio, nel cuore dell’Appennino Reggiano, circondata dai
            castelli matildici, alle porte del Parco Nazionale dell’Appennino
            Tosco-Emiliano “Il Gigante” e all’interno della zona MAB UNESCO.
          </p>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d711.536457105119!2d10.482757569662631!3d44.491678654872366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d552e2ba719e27%3A0x22cdb0cf8ee2dcff!2sAzienda%20Agricola%20Il%20Pichello!5e0!3m2!1sit!2sit!4v1736855691728!5m2!1sit!2sit"
        width="100%"
        height="450"
        loading="lazy"
        className="rounded-lg shadow-md"
      ></iframe>
    </section>
  );
}
