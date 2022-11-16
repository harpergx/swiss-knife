
const create = [
    'repository name (ex: klip-front) : ',
    'domain (ex: dev.klipwallet.com, swap.dev.klipwallet.com) : ',
    'product group (ex : klip, drops, kas, multichain) : ',
    'build path (ex : build, dist) : ',
    'env (ex: dev, qa, dev2 ..) : ',
    'acm certificate (ex : *.dev.klipwallet.com) : ',
    'route53 zone (ex : dev.klipwallet.com) : ',
    'Team name (ex : klipdrops-dev) :',
    'admin project : '
];

const terminate = [
    '삭제하고 싶은 project name : ',
    '삭제하고 싶은 환경 : ',
];

const confirm = [
    '확인하고 싶은 project name : ',
    '확인하고 싶은 환경 : ',
];


const update = [
    '확인하고 싶은 project name : \n (표시되지 않는 프로젝트는 업데이트 할 수 없습니다. env, project name 을 변경하고 싶으면 삭제하고 새로 생성하세요)',
    'domain',
    'product group',
    'build path ',
    'env',
    'acm certificate ',
    'route53 zone ',
    'Team name ',
    'admin project '
];

export { create, terminate, update, confirm }