/**
 * Arama başlatmak için gereken parametreler.
 */
export interface StartCallDto {
  /**
   * Müşterinin telefon numarası.
   * Örnek: "+905555555555"
   */
  customerNum: string;

  /**
   * Dahili numara.
   * Şirket içi bir dahili hat numarası.
   * Örnek: "101"
   */
  internalNum: string;

  /**
   * Aramada kullanılacak trunk hattı.
   * Örnek: "0850XXXXXXX"
   */
  trunk: string;

  /**
   * Çağrının açılmadan önce çaldırma süresi
   * Örnek: 20
   */
  ringTimeout?: number;

  /**
   * Çağrı için varsa oluşturduğunuz uniqId verisi. Bu değer response içerisinde size dönecektir
   * Örnek: 1
   */
  crmId?: Number;

  /**
   * Önce dış numarasının çalmasını istiyorsanız true değilse false değer verilmelidir.
   */
  originateOrder?: boolean;
}
