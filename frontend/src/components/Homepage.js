import React from 'react'
import pay from '../assets/images/calculator.png'
import apply from '../assets/images/evaluation.png'
import key_image from '../assets/images/key-dates.png'
import upload from '../assets/images/transcripts-documents.png'
import './Homepage.css'
const HomePage = () => {
    return (
        <React.Fragment>

            <React.Fragment>
                <section class="home container" id="home" style={{ padding: '4.5rem 0 3 rem' }}>
                    <div class="home-text">
                        <h1>Welcome to NSTU <br /> Academic Document<br /> Processing Portal</h1>


                    </div>
                </section>
                <p style={{ height: '20px' }}></p>
                {/* <p style={{ color: '#f2cd00', fontSize: '24pt', textAlign: 'center' }}>1</p> */}
                <h2 style={{ textAlign: 'center' }}>About Noakhali Science & Technology University</h2>
                <p style={{ height: '30px' }}></p>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                    <div className="key__dates" style={{ borderRight: '3px dotted #231f20' }}>
                        <h2 style={{ "color": "#3d4a43", "marginBottom": "5px", "textTransform": "capitalize" }}>
                            <img alt="Key Dates &amp; Deadlines" height="373" src={apply} width="372" style={{ "width": "60px", 'height': '60px', "marginBottom": "5px" }} />
                        </h2>
                        <h3 style={{ "fontSize": "calc(1.3125rem + 0.75vw)", "lineHeight": "calc(1.3625rem + 1.35vw)", "letterSpacing": "-0.005em", "color": "#2b292a", marginRight: '35px' }}>About our <br />Teachers</h3>
                        <p style={{ "marginTop": "0", "marginBottom": "1rem", textAlign: 'justify', paddingRight: '15px' }}>A teacher is one who proves himself/ herself very much useful and ideal to the students. Actually, a good teacher possesses a number of good qualities.</p>
                        <p><a value="pay" class="applyBtn applyBtn-apply" href='https://nstu.edu.bd/'>see more</a></p>

                    </div>
                    <div className="key__dates" style={{ borderRight: '3px dotted #231f20', marginLeft: '10px' }}>
                        <h2 style={{ "color": "#3d4a43", "marginBottom": "5px", "textTransform": "capitalize" }}>
                            <img alt="Key Dates &amp; Deadlines" height="373" src={upload} width="372" style={{ "width": "60px", 'height': '60px', "marginBottom": "5px" }} />
                        </h2>
                        <h3 style={{ "fontSize": "calc(1.3125rem + 0.75vw)", "lineHeight": "calc(1.3625rem + 1.35vw)", "letterSpacing": "-0.005em", "color": "#2b292a", paddingLeft: '10px' }}>About our<br /> Departments</h3>
                        <p style={{ "marginTop": "0", "marginBottom": "1rem", marginRight: '15px', textAlign: 'justify' }}>An academic department is a division of a university or school faculty devoted to a particular academic discipline.</p>
                        <p><a value="pay" class="applyBtn applyBtn-apply" href='https://nstu.edu.bd/'>see more</a></p>
                    </div>
                    <div className="key__dates" style={{ borderRight: '3px dotted #231f20', marginLeft: '10px' }}>
                        <h2 style={{ "color": "#3d4a43", "marginBottom": "5px", "textTransform": "capitalize" }}>
                            <img alt="Key Dates &amp; Deadlines" height="373" src={pay} width="372" style={{ "width": "60px", 'height': '60px', "marginBottom": "5px" }} />
                        </h2>
                        <h3 style={{ "fontSize": "calc(1.3125rem + 0.75vw)", "lineHeight": "calc(1.3625rem + 1.35vw)", "letterSpacing": "-0.005em", "color": "#2b292a", paddingLeft: '10px', marginRight: '15px', }}>About our<br /> Alumni</h3>
                        <p style={{ "marginTop": "0", "marginBottom": "1rem", marginRight: '15px', textAlign: 'justify' }}>An alumnus or an alumna of a college, university, or other school is a former student who has either attended or graduated in some fashion from the institution.</p>
                        <p><a value="pay" class="applyBtn applyBtn-apply" href='https://nstu.edu.bd/'>see more</a></p>
                    </div>
                    <div className="key__dates">
                        <h2 style={{ "color": "#3d4a43", "marginBottom": "5px", "textTransform": "capitalize" }}>
                            <img alt="Key Dates &amp; Deadlines" height="373" src={key_image} width="372" style={{ "width": "60px", 'height': '60px', "marginBottom": "5px" }} />
                        </h2>
                        <h3 style={{ "fontSize": "calc(1.3125rem + 0.75vw)", "lineHeight": "calc(1.3625rem + 1.35vw)", "letterSpacing": "-0.005em", "color": "#2b292a" }}>About our <br /> Programs</h3>
                        <p style={{ "marginTop": "0", "marginBottom": "1rem", textAlign: 'justify', marginLeft: '10px' }}>An academic program is a combination of courses and related activities organized for the achievement of specific learning outcomes as defined by the University.</p>

                        <p><a value="pay" class="applyBtn applyBtn-apply" href='https://nstu.edu.bd/'>see more</a></p>
                    </div>

                </div>
                <p style={{ height: '20px' }}></p>
                {/* <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '30px', fontWeight: '700' }}>Select your certificate</p> */}

                <h2 style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>Choose your Program</h2>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-around', marginTop: '10px', borderRight: '3px dotted #231f20' }}>

                        <h1 style={{ "fontWeight": "500", "fontSize": "calc(1.5813rem + 1.9756vw)", "lineHeight": "calc(1.625rem + 4.5vw)", "letterSpacing": "-0.007em", "color": "#275d38" }}>Undergraduate <br /> Studies</h1>
                        <p style={{ marginLeft: '15%', marginRight: '15%', marginTop: '10px', marginBottom: '10px', textAlign: 'justify' }}>Your journey starts here. Choose from more than 200 program options, check the admission requirements and apply online.</p>
                        <p><a value="pay" class="applyBtn applyBtn-apply" href='https://nstu.edu.bd/'>Apply Now</a></p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-around', marginTop: '10px' }}>

                        <h1 style={{ "fontWeight": "500", "fontSize": "calc(1.5813rem + 1.9756vw)", "lineHeight": "calc(1.625rem + 4.5vw)", "letterSpacing": "-0.007em", "color": "#275d38" }}>Graduate <br /> Studies</h1>
                        <p style={{ marginLeft: '15%', marginRight: '15%', marginTop: '10px', marginBottom: '10px', textAlign: 'justify' }}>More than 500 graduate programs, 250 specializations and 300 research areas — find out how to take your education to the next level.</p>
                        <p><a value="pay" class="applyBtn applyBtn-apply" href='https://nstu.edu.bd/'>Apply Now</a></p>
                    </div>
                </div>
                <p style={{ height: '10px' }}></p>
            </React.Fragment >
        </React.Fragment >
    )
}

export default HomePage