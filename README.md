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

> **Not:** Netgsm hesap ayarları bölümünden **Alt Kullanıcı Hesabı** oluşturarak username ve password değerlerini elde edebilirsiniz.
```js
const call = new Call({
  username: '850XXXXXXX',
  password: '*********',
});
```
<details>
<summary>Çağrı Başlat</summary>
  
**Santraliniz üzerinden bir dış arama başlatmanızı sağlar.**

```js
await call.start({
  customer_num: '5XXXXXXXXX',
  internal_num: '104',
  trunk: '850XXXXXXX',
});
```
</details>

<details>
<summary>Çağrı Sonlandır</summary>
  
**Aktif olan bir çağrıyı sonlandırmanızı sağlar.**

#### Son başlatılan çağrıyı sonlandırır.
```js
await call.end();
```

#### Spesifik bir çağrıyı sonlandırır. unique_id ve crm_id verileri bir çağrı başlattığınızda dönen response içerisinde bulunmaktadır.
```js
await call.end({ unique_id: 'sip-xxxx-xxxx-xxxx' crm_id: 1});
```
</details>

<details>
<summary>Çağrıyı Sessize Al</summary>
  
#### Gelen ve giden sesleri kapat.
```js
await call.mute({ direction: 'all' });
```

#### Sadece gelen sesleri kapat.
```js
await call.mute({ direction: 'in' });
```

#### Sadece giden sesleri kaapt
```js
await call.mute({ direction: 'out' });
```
</details>

<details>
<summary>Çağrıyı Sessizden Çıkar</summary>
  
#### Gelen ve giden tüm sesleri sessizden çıkar.
```js
await call.unMute({ direction: 'all' });
```
#### Sadece gelen sesi sesizden çıkar.
```js
await call.unMute({ direction: 'in' });
```
#### Sadece giden sesi sessizden çıkar.

```js
await call.unMute({ direction: 'out' });
```
</details>

<details>
<summary>Çağrıyı Transfer Et</summary>
  
#### Kör transfer (xfer - Blind Transfer) 
> xfer çağrı transferinde, arayan kişi başka bir kişiye yönlendirildiğinde, çağrıyı transfer eden kişi görüşmeden tamamen ayrılır.  Çağrıyı transfer eden kişi, çağrının yeni hedefe ulaşacağını kontrol etmez ya da arayanla hedef kişi arasında başka bir işlem yapmaz.
```js
await call.transfer({ exten: '104', type: 'xfer'});
```

#### Katılımlı transfer (atxfer - Attended Transfer)
> atxfer transferde, çağrıyı transfer eden kişi önce çağrıyı hedefe aktaracağı kişiyle (yeni alıcı) konuşur ve ardından transferi gerçekleştirir. Transfer işlemi sırasında çağrıyı transfer eden kişi, görüşme başlatmadan önce durumu açıklama fırsatına sahiptir.
```js
await call.transfer({ exten: '104', type: 'atxfer'});
```
</details>
