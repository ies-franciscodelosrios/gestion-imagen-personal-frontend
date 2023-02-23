import { } from 'react'
import './newsStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function main() {

  return (
    <div className="News">

      <section class="mb-10 card">
        <div className="underTitle">
          <h2 >Noticias</h2>
        </div>
        <div class="row gx-lg-5 align-items-center mb-5 news">
          <div class="col-md-6 mb-4 mb-md-0">
            <div class="bg-image hover-overlay ripple shadow-4-strong rounded-4 mb-4" data-mdb-ripple-color="light">
              <img src="src/pages/news/imgs/excursion.jpg" class="w-100" alt=""
                aria-controls="#picker-editor" /> </div>
          </div>
          <div class="col-md-6 mb-4 mb-md-0 ">
            <h3 class="fw-bold">Excursion escolar</h3>

            <p>Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut
              vulputate est non quam dignissim elementum. Donec a ullamcorper diam.</p>
          </div>
        </div>
        <div class="row gx-lg-5 align-items-center mb-5 flex-lg-row-reverse news">
          <div class="col-md-6 mb-4 mb-md-0">
            <div class="bg-image hover-overlay ripple shadow-4-strong rounded-4 mb-4" data-mdb-ripple-color="light">
              <img src="src/pages/news/imgs/examen.jpg" class="w-100" alt=""
                aria-controls="#picker-editor" /> </div>
          </div>
          <div class="col-md-6 mb-4 mb-md-0">
            <h3 class="fw-bold">Examen de peluqueria</h3>

            <p>Suspendisse in volutpat massa. Nulla facilisi. Sed aliquet diam orci, nec ornare
              metus semper sed. Integer volutpat ornare erat sit amet rutrum.</p>
          </div>
        </div>
        <div class="row gx-lg-5 align-items-center mb-5 news">
          <div class="col-md-6 mb-4 mb-md-0">
            <div class="bg-image hover-overlay ripple shadow-4-strong rounded-4 mb-4" data-mdb-ripple-color="light">
              <img src="https://img.freepik.com/foto-gratis/cosmetologa-aplicando-mascara-cara-cliente-salon-belleza_1303-16759.jpg?w=996&amp;t=st=1675763320~exp=1675763920~hmac=125e39d35389dbd7be88ee322280b9cfa3032fd186cb79bb1680f8167a2f66b1" class="w-100" alt=""
                aria-controls="#picker-editor" /> </div>
          </div>
          <div class="col-md-6 mb-4 mb-md-0">
            <h3 class="fw-bold">Examen tratamientos faciales</h3>

            <p>Curabitur tristique, mi a mollis sagittis, metus felis mattis arcu, non vehicula
              nisl dui quis diam. Mauris ut risus eget massa volutpat feugiat. Donec.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default main;