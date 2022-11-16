const conversionAcm = (acm_cert) => {

    //TODO : 각 도메인에 맞는 인증서 확인  
    if (acm_cert === '*.dev.klipwallet.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/a768ed57-0224-4988-ad2e-ac2ada99dda2';
    } else if (acm_cert === '*.dev3.klipwallet.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/af098c5b-d369-473d-809e-601b6625233b';
    } else if (acm_cert === '*.klipwallet.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/83fd96dc-87d3-4253-badc-247c5f53c60c';
    } else if (acm_cert === 'dev.groundxdev.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/6c31352e-2284-41bc-a94b-14725defff84';
    } else if (acm_cert === 'dev.klipdrops.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/19aa0f09-a0df-45a0-bb0c-1a325fe6426e';
    } else if (acm_cert === 'perf.klaytn.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/55f44ca2-cc5a-4f27-a61f-af7b6b2887b2';
    } else if (acm_cert === 'dev-api.klipwallet.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/705c16a8-83e6-4762-b0d5-605ca271f99d';
    } else if (acm_cert === '*.qa.klaytn.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/addb1ff2-f267-40df-a35c-5da162233e43';
    } else if (acm_cert === 'klipwallet.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/4873afa7-0e7b-494a-82be-2150efc3220e';
    } else if (acm_cert === '*.klaytn.net') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/ba72535a-8c6a-4d99-89a4-cf6560238e04';
    } else if (acm_cert === 'groundx.xyz') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/5d47a994-5572-4f5e-af65-d7f8820b234b';
    } else if (acm_cert === 'klaytn.com') {
        return 'arn:aws:acm:us-east-1:069889557760:certificate/250f287e-8609-43aa-ae9e-8c3aa7609fac';
    } else if (acm_cert === '직접입력') {
        return '';
    }
    return '';
  };


  const conversionAcl = (acl_id) => {
    try {
        //TODO : kyle 이 waf 분리 후 acl_id 변경
        if (acl_id === 'klip') {
            return 'd9a56184-38fe-435d-9c29-ffd4890d9a88';
        } else if (acl_id === 'drops') {
            return 'd9a56184-38fe-435d-9c29-ffd4890d9a88';
        } else if (acl_id === 'kas') {
            return 'd9a56184-38fe-435d-9c29-ffd4890d9a88';
        }
        return 'd9a56184-38fe-435d-9c29-ffd4890d9a88';
  
    } catch (e) {
        console.log(e)
    }
  
  };
  
  const conversionEnv = (env) => {
    if(env.includes("dev")) {
        return "dev";
      } else if(env.includes("qa")) {
        return "qa";
      } else if(env.includes("stg")) {
        return "stg";
      }else if(env.includes("prod")) {
        return "prod";
      }
      return env;
  };   
  
  
  exports.conversionAcm = conversionAcm;
  exports.conversionAcl = conversionAcl;
  exports.conversionEnv = conversionEnv;