import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LearningCarousel from "@/components/learning-carousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8E9]">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/logo02.svg"
            alt="Project Rewood"
            width={100}
            height={100}
            className="w-24 h-24 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-green-600 text-green-700">
            Đăng nhập
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 ">Đăng ký</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
            Học tiếng Trung hiệu quả <br />
            mọi lúc, mọi nơi
          </h1>
          <div className="flex flex-col space-y-4">
            <Button className="w-full md:w-64 h-12 text-base font-medium bg-green-600 hover:bg-green-700 shadow-md">
              Dùng thử miễn phí
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-64 h-12 text-base font-medium border-2 border-amber-500 text-amber-600 bg-amber-50 hover:bg-amber-100 shadow-sm"
            >
              Xem các khóa học
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-64 h-12 text-base font-medium border-2 border-orange-500 text-orange-600 bg-orange-50 hover:bg-orange-100 shadow-sm"
            >
              Đăng ký thành viên
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Image
            src="/hero-image.svg"
            alt="Learning Chinese"
            width={500}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-orange-800 mb-6">
          Tại sao nên chọn Rewood Project <br />
          để học tiếng Trung?
        </h2>
        <p className="text-gray-700 mb-8 max-w-3xl">
          Rewood Project mang đến trải nghiệm học tập toàn diện, từ giao ngôn
          ngữ, tương tác cao, hỗ trợ cá nhân và cộng đồng học viên năng động.
          Bạn có thể học mọi lúc, trên mọi thiết bị.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-500 rounded-lg p-6 text-white">
            <div className="mb-4">
              <Image
                src="/icon-computer.svg"
                alt="Online Learning"
                width={60}
                height={60}
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-semibold mb-2">
              Giáo trình học tập trực tuyến, đa dạng
            </h3>
            <p className="text-sm">Học mọi lúc, mọi nơi</p>
          </div>

          <div className="bg-green-600 rounded-lg p-6 text-white">
            <div className="mb-4">
              <Image
                src="/icon-notes.svg"
                alt="Curriculum"
                width={60}
                height={60}
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-semibold mb-2">
              Lộ trình rõ ràng từ HSK 1 đến HSK 6
            </h3>
            <p className="text-sm">Học có hệ thống</p>
          </div>

          <div className="bg-amber-500 rounded-lg p-6 text-white">
            <div className="mb-4">
              <Image
                src="/icon-mobile.svg"
                alt="Mobile Learning"
                width={60}
                height={60}
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-semibold mb-2">
              Học tập trên mọi thiết bị, mọi nền tảng
            </h3>
            <p className="text-sm">Học mọi lúc, mọi nơi</p>
          </div>
        </div>
      </section>

      {/* Learning Journey Section */}
      <section className="container mx-auto px-4 py-12 overflow-hidden">
        <LearningCarousel />
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Lựa chọn gói học lý tưởng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-amber-500 text-white p-4 text-center font-bold">
              Miễn phí
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-xl font-bold">0đ/tháng</p>
              </div>
              <p className="text-sm text-center text-gray-600">
                Truy cập các khóa học cơ bản, không giới hạn thời gian
              </p>
              <div className="pt-4">
                <Button variant="outline" className="w-full border-gray-300">
                  Chọn gói phù hợp
                </Button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-amber-600 text-white p-4 text-center font-bold">
              Gói Tháng Premium
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-xl font-bold">199.000đ/tháng</p>
              </div>
              <p className="text-sm text-center text-gray-600">
                Mở khóa toàn bộ bài học, tương tác, hỗ trợ riêng cao
              </p>
              <div className="pt-4">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Đăng ký ngay
                </Button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-amber-700 text-white p-4 text-center font-bold">
              Gói Năm Premium
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-xl font-bold">1.490.000đ/năm</p>
              </div>
              <p className="text-sm text-center text-gray-600">
                Tiết kiệm hơn 40% so với gói tháng, giảm vĩnh viễn hàng năm
              </p>
              <div className="pt-4">
                <Button variant="outline" className="w-full border-gray-300">
                  So sánh gói học
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <Image
              src="/contact-image.svg"
              alt="Contact Us"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Bạn cần tư vấn? <br />
              Đừng ngần ngại nhé!
            </h2>
            <p className="text-gray-700">
              Hãy để lại thông tin, đội ngũ Rewood sẽ liên hệ với bạn sớm nhất
              có thể để tư vấn chi tiết về lộ trình học tập phù hợp nhất.
            </p>

            <form className="space-y-4">
              <Input placeholder="Họ và tên" className="bg-white" />
              <Input placeholder="Email" className="bg-white" />
              <Input
                placeholder="Số điện thoại (nếu có)"
                className="bg-white"
              />
              <Textarea
                placeholder="Nội dung cần hỗ trợ / câu hỏi"
                className="bg-white"
              />
              <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">
                Gửi yêu cầu tư vấn
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image
              src="/logo.svg"
              alt="Project Rewood"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <div>
              <p className="font-bold text-green-700 uppercase">
                Project Rewood
              </p>
              <p className="text-xs text-gray-500">
                Copyright © 2023 Project Rewood
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-blue-600">
              <Image
                src="/icon-facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
            <Link href="#" className="text-pink-600">
              <Image
                src="/icon-instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
            <Link href="#" className="text-gray-800">
              <Image
                src="/icon-github.svg"
                alt="GitHub"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
