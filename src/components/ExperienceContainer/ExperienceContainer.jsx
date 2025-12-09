import React, { useState, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import styles from './ExperienceContainer.module.scss';


export const ExperienceContainer = () => {


  const reftcs = useRef(null);
  const refkey = useRef(null);
  const refasp = useRef(null);

  const isTcsInView = useInView(reftcs, { amount: 0.4 });
  const isKeyInView = useInView(refkey, { amount: 0.4 });
  const isAspInView = useInView(refasp, { amount: 0.4 });

  const [viewFlag, setViewFlag] = useState('tcs');




  return (
    <div className={styles.expContainer}>

      <div className={styles.expWrapper}>

        <div className={styles.expLeft}>


          <div className={styles.companyList}>
            <motion.div
              ref={reftcs}
              className={`${styles.companyContainer} ${viewFlag === 'tcs' ? styles.underLine : ''}`}
              onMouseEnter={() => setViewFlag('tcs')}
              initial={{ opacity: 0, transform: 'translateX(-10px)' }}
              animate={
                isTcsInView
                  ? { opacity: 1, transform: 'translateX(0)' }
                  : { opacity: 0, transform: 'translateX(-10px)' }
              }
              transition={{ duration: 1 }}
            >
              <div className={styles.company}>
                <img src='/assets/tcs.png' alt="flag" />
              </div>
            </motion.div>

            <motion.div
              ref={refkey}
              className={`${styles.companyContainer} ${viewFlag === 'keyvalue' ? styles.underLine : ''}`}

              onMouseEnter={() => setViewFlag('keyvalue')}
              initial={{ opacity: 0, transform: 'translateX(-10px)' }}
              animate={
                isKeyInView
                  ? { opacity: 1, transform: 'translateX(0)' }
                  : { opacity: 0, transform: 'translateX(-10px)' }
              }
              transition={{ duration: 1 }}
            >
              <div className={styles.company}>

                <img src='/assets/keyvalue-min.png' alt="flag" />
              </div>
            </motion.div>

            <motion.div
              ref={refasp}
              className={`${styles.companyContainer} ${viewFlag === 'aspire' ? styles.underLine : ''}`}

              onMouseEnter={() => setViewFlag('aspire')}
              initial={{ opacity: 0, transform: 'translateX(-10px)' }}
              animate={
                isAspInView
                  ? { opacity: 1, transform: 'translateX(0)' }
                  : { opacity: 0, transform: 'translateX(-10px)' }
              }
              transition={{ duration: 1 }}
            >
              <div className={styles.company}>
                <img src='/assets/aspire-min.png' alt="flag" />
              </div>
            </motion.div>

            <motion.div
              ref={refasp}
              className={`${styles.companyContainer} ${viewFlag === 'mine' ? styles.underLine : ''}`}

              onMouseEnter={() => setViewFlag('mine')}
              initial={{ opacity: 0, transform: 'translateX(-10px)' }}
              animate={
                isAspInView
                  ? { opacity: 1, transform: 'translateX(0)' }
                  : { opacity: 0, transform: 'translateX(-10px)' }
              }
              transition={{ duration: 1 }}
            >
              <div className={styles.company}>
                <img src='/assets/desktoppc.png' alt="flag" />
              </div>
            </motion.div>
          </div>
        </div>


        <div className={styles.expRight}>
          <div className={styles.expLabel}>
            Organisations I worked for
          </div>
          <div className={styles.expNameContainer}>
            <div className={`${styles.companyName} ${viewFlag === 'tcs' ? styles.show : ''}`}>
              <div className={styles.shortName}>TCS</div>
              <span className={styles.companyFullName}>Tata Consultancy Services</span>&nbsp; | &nbsp;
              <span className={styles.companyLoc}>Kochi</span> &nbsp;|&nbsp;
              <span className={styles.fromTo}>
                2017 - 2019
              </span>
            </div>

            <div className={styles.descWrapper}>
              <div className={styles.companyDesc}
                style={viewFlag === 'tcs' ?
                  { opacity: 1, transform: 'translateX(0)' } :
                  { opacity: 0, transform: 'translateX(-10px)' }}>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    Internal web app development for Kuwait Bank. (Angular 6).
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    Developed generic dashboards and other visual components for micro front ends.
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    Created UX designsfor bank applicartions (Adobe Xd &  Adobe Illustrator)
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    Internal web app development for Kuwait Bank. (Angular 6)
                  </div>
                </div>
              </div>

            </div>
            <div className={`${styles.companyName} ${viewFlag === 'keyvalue' ? styles.show : ''}`}>
              <div className={styles.shortName}>KEYVALUE</div>
              <span className={styles.companyFullName}>Keyvalue systems</span>&nbsp; | &nbsp;
              <span className={styles.companyLoc}>Kochi</span> &nbsp;|&nbsp;
              <span className={styles.fromTo}>
                2019-2022
              </span>
            </div>
            <div className={styles.descWrapper}>
              <div className={styles.companyDesc}
                style={viewFlag === 'keyvalue' ?
                  { opacity: 1, transform: 'translateX(0)' } :
                  { opacity: 0, transform: 'translateX(-10px)' }}>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" />
                  </div>
                  <div className={styles.descText}>
                    Mobile App development (React Native)
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    E-commerce Web App (React JS)
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    Community Web App (React and TS)
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    UX designer for community mobile app including feeds, chats,
                    video live and other features
                  </div>
                </div>
              </div>

            </div>



            <div className={`${styles.companyName} ${viewFlag === 'aspire' ? styles.show : ''}`}>
              <div className={styles.shortName}>ASPIRE</div>
              <span className={styles.companyFullName}>Aspire systems</span>&nbsp; | &nbsp;
              <span className={styles.companyLoc}>Kochi</span> &nbsp;|&nbsp;
              <span className={styles.fromTo}>
                2022 - 2025
              </span>
            </div>
            <div className={styles.descWrapper}>
              <div className={styles.companyDesc}
                style={viewFlag === 'aspire' ?
                  { opacity: 1, transform: 'translateX(0)' } :
                  { opacity: 0, transform: 'translateX(-10px)' }}>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    Redux state management solutions for multiple projects.
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    Module ownership and lead role in development of life insurance project.
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    Team lead and training faculty for freshers and new joinees.
                  </div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletPoints}>
                    <img src="/assets/arrow.png" alt="flag" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.descText}>
                    CI/CD Pipeline implementation, Module Federation (MFE),  AWS based projects.
                  </div>
                </div>
              </div>

            </div>

            <div className={`${styles.companyName} ${viewFlag === 'mine' ? styles.show : ''}`}>
              Freelance
            </div>
          </div>


        </div>



      </div>


      {/* <div className={styles.bgWrapper}

        style={viewFlag === 'tcs' ?
          {
            opacity: 1, transform: 'translateX(0)',
            backgroundImage: "url('/assets/tcs.png')",
            // boxShadow: '-10px 0 15px rgba(0, 0, 0, 0.1)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '40%',
            height: 'calc(100vh - 140px)',
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            opacity:0.1
            
          }
          :
          { opacity: 0, transform: 'translateX(200px)' }}
      />

      <div className={styles.bgWrapper}

        style={viewFlag === 'keyvalue' ?
          {
            opacity: 1, transform: 'translateX(0)',
            backgroundImage: "url('/assets/keyvalue-min.png')",
            // boxShadow: '-10px 0 15px rgba(0, 0, 0, 0.1)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '40%',
            height: 'calc(100vh - 140px)',
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            opacity:0.1
          }
          :
          { opacity: 0, transform: 'translateX(200px)' }}
      />

      <div className={styles.bgWrapper}
        style={viewFlag === 'aspire' ?
          {
            opacity: 1, transform: 'translateX(0)',
            // boxShadow: '-10px 0 15px rgba(0, 0, 0, 0.1)',
            backgroundImage: "url('/assets/aspire-min.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '40%',
            height: 'calc(100vh - 140px)',
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            opacity:0.1
          }
          :
          { opacity: 0, transform: 'translateX(200px)' }}
      />
      <div className={styles.bgWrapper}
        style={viewFlag === 'mine' ?
          {
            opacity: 1, transform: 'translateX(0)',
            boxShadow: '-10px 0 15px rgba(0, 0, 0, 0.1)',
            backgroundImage: "url('/assets/bg10.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '40%',
            height: 'calc(100vh - 140px)',
            position: 'absolute',
            bottom: '0px',
            right: '0px',
          }
          :
          { opacity: 0, transform: 'translateX(200px)' }}
      /> */}
    </div>




  )
}
