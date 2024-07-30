export default function ContactUs() {
    return (
        <>
            <div className="breadcrumbs overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs-content">
                                <h1 className="page-title">Contact Us</h1>
                                <p>What do you seek? Whether it’s a work-from-home role or a bigger salary, we’ll help you find the right job. There’s no secret – just better job matches than ever before. Seek and you shall find.</p>
                            </div>
                            <ul className="breadcrumb-nav">
                                <li>
                                    <a href="{% url 'index' %}">Home</a>
                                </li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <section id="contact-us" className="contact-us section">
                <div className="container">
                    <div className="contact-head wow fadeInUp" data-wow-delay=".4s">
                        <div className="row">
                            <div className="col-lg-7 col-12">
                                <div className="form-main">
                                    <form className="form" method="post" action="{% url 'contact' %}">
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    {/* { form.name.label_tag }
                { form.name }
                { form.name.errors } */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    {/* { form.subject.label_tag }
                { form.subject }
                { form.subject.errors } */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    {/* { form.email.label_tag }
                { form.email }
                { form.email.errors } */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    {/* { form.phone.label_tag }
                { form.phone }
                { form.phone.errors } */}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group message">
                                                    {/* { form.message.label_tag }
                { form.message }
                { form.message.errors } */}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group button">
                                                    <button type="submit" className="btn">
                                                        Submit Message
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-5 col-12">
                                <div className="single-head">
                                    <div className="contant-inner-title">
                                        <h4>Contact Information</h4>
                                        <p>Business consulting excepteur sint occaecat cupidatat consulting non proident.</p>
                                    </div>
                                    <div className="single-info">
                                        <i className="lni lni-phone"></i>
                                        <ul>
                                            <li>+359 899 899-899</li>
                                        </ul>
                                    </div>
                                    <div className="single-info">
                                        <i className="lni lni-envelope"></i>
                                        <ul>
                                            <li>
                                                <a href="mailto:t******.n******@gmail.com">t******.n******@gmail.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-info">
                                        <i className="lni lni-map"></i>
                                        <ul>
                                            <li>8000 Burgas , Bulgaria</li>
                                        </ul>
                                    </div>
                                    <div className="contact-social">
                                        <h5>Follow Us on</h5>
                                        <ul>
                                            <li>
                                                <a target="_blank" href="https://facebook.com/tihmir.nedelchev">
                                                    <i className="lni lni-facebook-original"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="https://www.linkedin.com/in/tihomir-nedelchev/">
                                                    <i className="lni lni-linkedin-original"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="https://github.com/Nedelchev86">
                                                    <i className="lni lni-github-original"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="map-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="map-container">
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=523&amp;height=403&amp;hl=en&amp;q=Kalofer%20Burgas+(JobsPy)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href='https://google-map-generator.com/'>Maps Generator</a>

                                    <style>
                                        .mapouter {
                                            position: relative;
                                            text-align: right;
                                            height: 400px;
                                            width: 100%;
                                        }

                                        .gmap_canvas {
                                            overflow: hidden;
                                            background: none !important;
                                            height: 400px;
                                            width: 100%;
                                        }
                                    </style><a href="https://maps-google.github.io/embed-google-map/">embed google
                                        map</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
            </section>
        </>
    );
}
