# NewsOP

NewsOP; Habercilik operasyonlarının takibi, ortak çalışması, haberlerin metin editörlüğü gibi habercilikteki birçok operasyonu yapay zeka desteğiyle kolaylaştıran ve verimli hale getiren bir platformdur.
Platform farklı servisler halinde geliştirilmiştir. 

## Dashboard
![image](https://github.com/tahaerel/NewsOP/assets/63150746/6229a429-9e0f-487d-abc2-d9f2c4e8e63f)
Tüm operasyonların kontrol edildiği paneldir.
Veriler, profil sayfası, bildirimler, haberler ve haber editörü, görevler, takvim, iletişim, dosya yönetimi, gündem tarama, görsel editleme, eğitim merkezi ve yardım talebi gibi özelliklere bu platform üzerinden erişim sağlanır. 

### Çalıştırma
Html, css, js, bootstrap ve pug kullanılarak geliştirilmiştir. 
Localhost üzerinden başlatılarak erişim sağlanır. 

## AI Editor

Yapay zeka tabanlı haber yazma editörüdür. Normal editörlerin aksine, AA datalarıyla fine-tune edilerek eğitilmiş chatgpt entegresine sahiptir. Metin bazlı birçok farklı işlevi yerine getirebilir ve işlevler kişiselleştirilebilir.

### Çalıştırma
NodeJS + Typescript + OpenAi ChatGPT Api kullanılarak geliştirilmiştir.

```
npm install
export OPENAI_API_KEY="***"
npm run dev
```
Ayarlardan OpenAi api anahtarı girilmesi gerekmektedir. Almak için -->  [Link](https://platform.openai.com/api-keys)

http://localhost:3000/newsop/editor sayfasından erişim sağlanır. 

## Search News

![image](https://github.com/tahaerel/NewsOP/assets/63150746/5e96b1d2-34ed-4d03-b2e0-b3581012bfd2)

Ülke, haber kaynağı, tarih ve kelime filtremeleri yaparak birçok farklı kaynaktan haber araması yapmayı sağlar.  

### Çalıştırma
Html + css + js + NewsApi kullanılmıştır. 
Dashboard içerisine gömülmüştür. Ayrı bir şekilde çalıştırmaya gerek kalmadan **Gündem Tarama** sekmesinden erişim sağlanılabilir.
Api key projede test amaçlı bırakılmıştır. Dashboard dışında başlatmak için localhostta açmak yeterlidir.

## AI Voice

![image](https://github.com/tahaerel/NewsOP/assets/63150746/ab3dec38-533a-4f3b-b180-b0476aaf4d62)

Toplantıları, röportajları veya herhangi bir videoyu (canlı videolar dahil) sekme sesini dinleyerek metne dönüştürmeyi ve metinde işlemler yapmayı sağlayan bir tarayıcı eklentisidir. 

### Çalıştırma
NodeJS + Typescript + OpenAi ChatGPT ve Whisper AI Api kullanılarak geliştirilmiştir.
```
npm install
npm run build
1.Tarayıcınızdan eklenti ayarlarına gelin.
2.Developer modunu aktif hale getirin.
3.Paketlenmemiş öğe yükle butonuna basın.
4.Proje konumundaki "ext" dosyasını seçin. 

```
## AI Image

![image](https://github.com/tahaerel/NewsOP/assets/63150746/719431bb-e1de-4a67-b6b2-857da94f350e)

Yapay zeka kullanarak görsellerin çözünürlüğünü arttırma ve otomatik insan, araç plakası blurlama işlemlerini gerçekleştirir. 

### Çalıştırma
Html, css, js, RapidApi kullanılarak geliştirilmiştir. 
Localhost üzerinden başlatılarak erişim sağlanır. 


