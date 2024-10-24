# netsantral-js

Netgsm'in bir ürünü olan Netsantral için gelitirilmiş npm paketedir.

## Kurulum

`netsantral-js` paketini npm kullanarak kurabilirsiniz:

```shell
npm i netsantral-js
```

## Santral Yönetimi

Santral paketini projenize dahil edin.

```js
import { Call } from 'netsantral-js';
```

Çağrı süreçlerini yönetmek için bir Call instance oluşturun.

```js
//Netgsm hesap ayarları bölümünde buluna Alt Kullanıcı Hesabı oluşturarak username ve password değerlerini elde edebilirsiniz.

const call = new Call({
  username: '850XXXXXXX',
  password: '*********',
});
```

### Çağrı Başlat

```js
await call.start({
  customer_num: '5XXXXXXXXX',
  internal_num: '104',
  trunk: '850XXXXXXX',
});
```

### Çağrı Sonlandır

```js
//Son başlatılan çağrıyı sonlandırır.

await call.end();

//Spesifik bir çağrıyı sonlandırır. unique_id ve crm_id verileri bir çağrı başlattığınızda dönen response içerisinde bulunmaktadır.

await call.end({ unique_id: 'sip-xxxx-xxxx-xxxx' crm_id: 1});
```

### Çağrıyı Sessize Al

```js

await call.mute({ direction: 'all' }); //Gelen ve giden sesleri kapatır.


await call.mute({ direction: 'in' }); //Gelen sesi kapatır.


await call.mute({ direction: 'out' }); //Giden sesi kapatır.
```


### Çağrıyı Sessizden Çıkar

```js
await call.unMute({ direction: 'all' }); //Gelen ve giden sessizden çıkarır.


await call.unMute({ direction: 'in' }); //Gelen sesi sessizden çıkarır.


await call.unMute({ direction: 'out' }); //Giden sesi sessizden çıkarır.
```