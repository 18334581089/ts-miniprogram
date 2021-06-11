const ENV = {
  test: {
    // BASE_URL: 'http://192.168.10.13:8823',
    BASE_URL: 'http://192.168.10.102:8823',
    appId: 'wx8c77e156ac75ec21',
    STORE_ID: 10000
  },
  online_test: {
    BASE_URL: 'https://huamei.natapp4.cc',
    appId: 'wx11687a8e9bcffc7b',
    STORE_ID: 10000
  },
  online: {
    BASE_URL: 'https://huamei.natapp4.cc',
    appId: 'wxf38192263a0d6de4',
    STORE_ID: 10000
  }
}

export default ENV['test']