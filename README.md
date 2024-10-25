# netsantral-js

Netgsm'in bir ürünü olan Netsantral için gelitirilmiş npm paketedir.

## Kurulum

`netsantral-js` paketini npm kullanarak kurabilirsiniz:

```shell
npm i netsantral-js
```

netsantral-js paketini projenize dahil edin.

```js
import * as netsantral from 'netsantral-js';
```

> **Not:** Netgsm hesap ayarları bölümünden **Alt Kullanıcı Hesabı** oluşturarak username ve password değerlerini elde edebilirsiniz.

## Santral Yönetimi


Çağrı süreçlerini yönetmek için bir Call instance oluşturun.



```js
const call = new netsantral.Call({
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
await call.transfer({ exten: '104', type: 'atxfer' });
```

</details>

## Kuyruk Yönetimi

Kuyruk süreçlerini yönetmek için bir Queue instance oluşturun.

```js
const queue = new netsantral.Queue({
  username: '850XXXXXXX',
  password: '*********',
});
```

<details>
<summary>Kuyruk İstatistiklerini Al</summary>
  
#### Belirli bir kuyruk istatiğini al
```js
await queue.stats({queue: '{{queueName}}'}),
```
</details>

<details>
<summary>Kuyruğa Dahili Ekle</summary>
  
#### Dahiliyi belirli bir kuyruğa ekleyebilirsin
> "**paused: 1**" Kuyruğa aktarılan dahili molada olarak aktarılır.

> "**paused: 0**" Kuyruğa aktarılan dahili müsait olarak aktarılır.

```js
await queue.addInternal({
  queue: '{{queueName}}',
  exten: '{{internal}}',
  paused: 1,
});
```

</details>

<details>
<summary>Dahiliyi Molaya Al</summary>
  
#### Dahili için bir mola başlat
```js
  await queue.startInternalBreak({
    queue: '{{queueName}}',
    exten: '{{internal}}',
    reason: '{{reason}}',
  });
```
</details>

<details>
<summary>Dahiliyi Moladan Çıkar</summary>
  
#### Dahili için aktif molayı sonlandır
```js
  await queue.stopInternalBreak({
    queue: '{{queueName}}',
    exten: '{{internal}}',
    reason: '{{reason}}',
  });
```
</details>
