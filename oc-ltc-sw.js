importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'); 

var CACHE_VERSION = 3;
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-vp-oc-ltc-v' + CACHE_VERSION
};

//Page Link Example:
//https://asimut.github.io/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/index.html
var pageLink = 'https://asimut.github.io/VP-OC-LTC/';

workbox.setConfig({ debug: true });

self.addEventListener('install', function(event) {
  let ok,
    libjs = ['player-0.0.11.min', 'main.bundle', 'lzwcompress'],
    libcss = ['main.bundle', 'icomoon'],
    libfonts = ['icomoon', 'Lato-Black', 'Lato-Bold', 'Lato-Italic', 'Lato-Light', 'Lato-Regular'],
    assets =[
      '0ikkG2cKaxUEgboY_ykYH-2sOuLlt3xBh.svg',
      '0SHrHfFMjix6Rcv1_quote_background.jpg',
      '2OIkccblaHApXxCa_VYuYI7nIrxHxvabA.svg',
      '3DnXTNaf3r81YnrE_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline.mp4',
      '4cnqz1qvHoY1Vcn0_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks-00001.png',
      '5BLkdvsZ51RJ8Jqn_1yD4Do8N_Hujjs16.png',
      '6HtHA6bFv3UVhsww_J_FVNfk8t0zWFs9F.png',
      '7ai9kSqSOV519Twz_e_xujU5j_OLzuM4p.png',
      '7nvUhBnKXgY0oG5O_GEJmaWhVU7yhIAU-.svg',
      '7zt8tg78Xn2PI8c7_transcoded-6iZM7VOHmGoVJ7qg-lips-00001.png',
      '8eMJQDPti2QkRPzp_mYWpiGscet6aDTb7.png',
      '8JmKdIcVq6H8PblU_NAglbQI4L5aMZlWz.svg',
      '9X4qGRtqVD4Nr6LA_ZS0Y6uc5n2amivaW.png',
      '44v2Wg9uzcIOCWM-_XUkQ0oUg1ipb3NR2.svg',
      '1738lcxGyelvpmFJ_N1-UfLnIhcQWsJBy.png',
      'ab8TnqwD1pFmBPp__transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks.mp4',
      'AJ0kEu97VX9GWuQ7_transcoded-LalaPRKzNnds7fOX-lower-limbs-00001.png',
      'AmKw74SWnCGAJT-e_7IPQG48I1Ca_maf4.png',
      'bw9pNgdtQtECLdHq_9_OaSN0gZxqw1dV1.svg',
      'BxItv7Lxe_Vpktxo_mUC3DORyoD6E4WAi.png',
      'c1drvzfprAHPS9nk_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks-00001.png',
      'cHbH5q0VQtiaIxBD_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline-00001.png',
      'cpOGSuXNAqwapGUu_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks.mp4',
      'dKrVBMiv9xPXX73C_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline-00001.png',
      'doVysxzEU6iLhcpN_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks.mp4',
      'dqjLYR41KCwbczwl_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks-00001.png',
      'EJGbMvf7cDr8C73G_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks-00001.png',
      'EnN66tR9iEIMwdsA_l4DwlC6Zyzh7p3yI.svg',
      'es1VgvlUoV2kzjEd_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks.mp4',
      'F_pkqa8zmbD5_ro4_uh4dqE7zsUI2r1wB.png',
      'FGcb1s1FjXL-uwyb_LtxkH4s7Nriha1gg.png',
      'fQhNBLgftJCwjwYr_00iaS05tFptaeCbk.png',
      'g2TcDA2BoIqtIZOE_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline-00001.png',
      'G7wyYateBWwe-Lwo_d9U3AKfdex_kRXGd.png',
      'gMOKRP7arAND0Wgv_transcoded-eZ9E531W2YCH-5Jd-upper-limbs-00001.png',
      'hK06BtCWL3g0fhjP_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline.mp4',
      'idxiPyidQ75SQnoe_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline.mp4',
      'Iu2VbXYKCXocCdUf_eBNFJIOYzNOhWZYQ.svg',
      'JNzLzVF6Fx8JT-Mw_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline.mp4',
      'KJH7AIC45ziYt3NV_KEzpUfBEn0Az1Ge-.png',
      'KzBHkk7czk7UqEcW_small.png',
      'Lp78mci4jMt6qu71_pSQRJWXMj0UNOWMg-INGREZZA-Full-Prescribing-Information.pdf',
      'LpC18KGOOJmA1XO9_6IZvN3VbvJfZuVSv.png',
      'MpxqxcjEtou0J478_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks.mp4',
      'nVZ7NzSLNU444p4p_no6UxbNTeWok2n3A.svg',
      'Nw2OfEg_pKfZ63uy_zZq-bPMAXR15ya9M.png',
      'O26FzvBkj4SQTPzJ_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks-00001.png',
      'oKFNm71_EWHGSy4h_transcoded-LalaPRKzNnds7fOX-lower-limbs.mp4',
      'ONdB-ph-p2oy2A4S_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks.mp4',
      'oysBogO9sWffM3NR_lHtwpeq8m4E6AHwF.svg',
      'pLZCa1GYj-Vb8KFx_transcoded-eZ9E531W2YCH-5Jd-upper-limbs.mp4',
      'q_C0Jji_pcvcwXSO_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks-00001.png',
      'Q_rHUvBFFa7dWYR5_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks-00001.png',
      'q8OQgzXOTRTncopG_example-header-image.jpg',
      'qFUigmnC_go35Q4e_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks.mp4',
      'qgRz93DV7TSEjE97_eg2U9dbqW5iiA1gu.png',
      'QIr8pKoqVRwX5olp_P1c5WYGq3jg-mCNZ.png',
      'qYrxagx-faFPo5O-_transcoded-cyqlI9DTLppcN8Vk-torso-00001.png',
      'R6fYfBo4d0CoUBxs_13hdjUb-c0yHwHk_.svg',
      'RqmbS43bT1wIiEx8_87lR_1YbKaT0xj89.svg',
      'RRjBzwqwHHN93SJm_C88oIjnBMA5EDKh6.svg',
      'RwpiMJcwDb7075-3_3wcDpAmAcE2Xyp7a.png',
      'ryGGeGFQnZXXh9aE_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline.mp4',
      'swdHq21NTsJWxDqN_W5UNh2WCWjwE5PnY.svg',
      'SZoPdu2biTbwOrDb_rirvyWZ-Z8H5N5WU.png',
      'tLIMsxdBsZymgu5Y_sCL8JTnSLLASHJ65.png',
      'TrgJ_guHvL0HE9FY_4_cities.jpg',
      'TtfJgrLxccyFoFbF_YTyU0bPGcgSPuqVN.png',
      'TYQFS6twUd_tcvzI_LUi5YO0ctCiLxyfK-Full Prescribing Information.pdf',
      'ueMaJK5okkYn2cE-_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline-00001.png',
      'ujyNGWNIiY0LokyV_pUKlA_ZN5HnDD-9s.svg',
      'USfO4yyUZsobZWC3_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks.mp4',
      'vem1irVC53zY6cHI_rbbCcjDvWWgedPLb.png',
      'VeM-ExxXri9uvazX_yjZQLNQnL37VJ8Ca.png',
      'Vo6exI3Tieg5cCss_Q0fKDZtYxc315r7W.png',
      'VsbbQHtEKgGFo25-_ZPmBKRlu0OrtPMw2.svg',
      'VsI3Jae-i5RzCM7o_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline-00001.png',
      'w3UT4w0ZBK2sHWVv_SHJprNBfEAJsor0T.svg',
      'Wg_qDfWMWkZgglrY_Sz_vyJhC9P2kae6N.png',
      'wOQ2Sz1HSsihxptS_transcoded-cyqlI9DTLppcN8Vk-torso.mp4',
      'WqECJQCMOXmxJh3k_g8bPw1K2DEpVFpcA.svg',
      'x0UW9nZf38KM-Rmu_MnbOxGzPiF0rgjfF.png',
      'X3e1LZsKcgIb918O_small_1579124541.png',
      'xCHhaStRPE5DNU7v_transcoded-6iZM7VOHmGoVJ7qg-lips.mp4',
      'XExPZ7sVKS-sfOFh_SusOL-1a6PCd3MSX.png',
      'XHu8C6QUhFCtKY0x_G5c__lWMeoUcW8eJ.png',
      'Xo1FHLc6L6XisyVs_ieFIJ8yYnkhzudaH.svg',
      'xP4JdsMzQfttAFmq_-n9YNqPAl_oHkUcM.svg',
      'Xwt4XrJpe4C5VCYc_oIvQVO0kU3JbZteJ.svg',
      'yJURXhVNMffL42z4_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks-00001.png',
      'YOsVp8P2U6ZzRI2G_j0QP4VpqpRUbq5Ez.png'
    ];
  var urlsToPrefetch = [
      pageLink,
      pageLink+'index.html',
      ...libjs.map(i => pageLink+'lib/' + i + '.js'),
      ...libcss.map(i => pageLink+'lib/' + i + '.css'),
      ...libfonts.map(i => pageLink+'lib/fonts/' + i + '.woff'),
      pageLink+'lib/fonts/icomoon.ttf',
      pageLink+'assets/custom/jquery-3.6.0.min.js',
      pageLink+'assets/custom/script.js',
      pageLink+'assets/custom/style.css',
      pageLink+'assets/custom/arrow_down.png',
      pageLink+'assets/custom/chat.svg',
      pageLink+'assets/custom/check.svg',
      pageLink+'assets/custom/cover_logo.png',
      pageLink+'assets/custom/down-arrow.svg',
      pageLink+'assets/custom/ingrezza-valbenazine-logo-n.svg',
      pageLink+'assets/custom/logo-modal.png',
      pageLink+'assets/custom/open-book.svg',
      ...assets.map(i => pageLink+'assets/' + i),
      pageLink+'oc-ltc-sw.js',
      pageLink+'manifest.json',
      pageLink+'152.png',
      pageLink+'144.png',
      pageLink+'64.png',
      pageLink+'32.png',
      pageLink+'android-launchericon-512-512.png'
  ];

  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

  // self.skipWaiting();

  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(async (cache) => {
      return cache.addAll(urlsToPrefetch);      
    }).then(() => {
      console.log('All files were successfully cached.');

      caches.open(CURRENT_CACHES.prefetch).then(cache => {
        cache.keys()
        .then(requests => console.log(requests))
      })

      self.skipWaiting();
    })
  );

});

self.addEventListener('activate', function(event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // if (expectedCacheNames.indexOf(cacheName) === -1) {
          //   // If this cache name isn't present in the array of "expected" cache names, then delete it.
          //   console.log('Deleting out of date cache:', cacheName);
          //   return caches.delete(cacheName);
          // }
        })
        );
    })
    );    
});

self.addEventListener('fetch', function(event) {
  
  headersLog = [];
  for (var pair of event.request.headers.entries()) {
    console.log(pair[0]+ ': '+ pair[1]);
    headersLog.push(pair[0]+ ': '+ pair[1])
 }
 console.log('Handling fetch event for', event.request.url, JSON.stringify(headersLog));

  if (event.request.headers.get('range')) {
    console.log('Range request for', event.request.url);
    var rangeHeader=event.request.headers.get('range');
    var rangeMatch =rangeHeader.match(/^bytes\=(\d+)\-(\d+)?/)
    var pos =Number(rangeMatch[1]);
    var pos2=rangeMatch[2];
    if (pos2) { pos2=Number(pos2); }
    
    console.log('Range request for '+ event.request.url,'Range: '+rangeHeader, "Parsed as: "+pos+"-"+pos2);
    event.respondWith(
      caches.open(CURRENT_CACHES.prefetch)
      .then(function(cache) {
        return cache.match(event.request.url);
      }).then(function(res) {
        if (!res) {
          console.log("Not found in cache - doing fetch")
          return fetch(event.request)
          .then(res => {
            console.log("Fetch done - returning response ",res)
            return res.arrayBuffer();
          });
        }
        console.log("FOUND in cache - doing fetch")
        return res.arrayBuffer();
      }).then(function(ab) {
        console.log("Response procssing")
        let responseHeaders=  {
          status: 206,
          statusText: 'Partial Content',
          headers: [
            ['Content-Type', 'video/mp4'],
            ['Content-Range', 'bytes ' + pos + '-' + 
            (pos2||(ab.byteLength - 1)) + '/' + ab.byteLength]]
        };
        
        console.log("Response: ",JSON.stringify(responseHeaders))
        var abSliced={};
        if (pos2>0){
          abSliced=ab.slice(pos,pos2+1);
        }else{
          abSliced=ab.slice(pos);
        }
        
        console.log("Response length: ",abSliced.byteLength)
        return new Response(
          abSliced,responseHeaders
        );
      }));
  } else {
    console.log('Non-range request for', event.request.url);
    event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found response in cache:', response);
        return response;
      }
      console.log('No response found in cache. About to fetch from network...');
      // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
      // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
      return fetch(event.request).then(function(response) {
        console.log('Response from network is:', response);

        return response;
      }).catch(function(error) {
        // This catch() will handle exceptions thrown from the fetch() operation.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error('Fetching failed:', error);

        throw error;
      });
    })
    );
  }
});
