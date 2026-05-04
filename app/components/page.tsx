import {
  Bell,
  Check,
  ChevronRight,
  Mail,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold tracking-tight">{children}</h2>
      <Separator className="mt-2" />
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">컴포넌트 쇼케이스</h1>
        <p className="mt-2 text-muted-foreground">
          shadcn/ui 컴포넌트 사용 예시 모음
        </p>
      </div>

      <div className="space-y-12">
        {/* 버튼 섹션 */}
        <section>
          <SectionTitle>Button</SectionTitle>
          <div className="flex flex-wrap gap-3">
            <Button>기본 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="outline">아웃라인</Button>
            <Button variant="ghost">고스트</Button>
            <Button variant="destructive">삭제</Button>
            <Button variant="link">링크</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">작은 버튼</Button>
            <Button size="default">기본 크기</Button>
            <Button size="lg">큰 버튼</Button>
            <Button size="icon">
              <Bell />
            </Button>
            <Button disabled>비활성화</Button>
            <Button>
              <Mail className="mr-2 size-4" />
              이메일 보내기
            </Button>
          </div>
        </section>

        {/* 배지 섹션 */}
        <section>
          <SectionTitle>Badge</SectionTitle>
          <div className="flex flex-wrap gap-3">
            <Badge>기본</Badge>
            <Badge variant="secondary">보조</Badge>
            <Badge variant="outline">아웃라인</Badge>
            <Badge variant="destructive">삭제/경고</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge>
              <Check className="mr-1 size-3" />
              완료
            </Badge>
            <Badge variant="secondary">
              <Star className="mr-1 size-3" />
              추천
            </Badge>
            <Badge variant="outline">v1.0.0</Badge>
            <Badge variant="destructive">
              <Trash2 className="mr-1 size-3" />
              삭제됨
            </Badge>
          </div>
        </section>

        {/* 입력 섹션 */}
        <section>
          <SectionTitle>Input & Label</SectionTitle>
          <div className="grid max-w-lg grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="이름을 입력하세요" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="disabled">비활성화 입력</Label>
              <Input
                id="disabled"
                placeholder="비활성화됨"
                disabled
                value="수정 불가"
              />
            </div>
          </div>
        </section>

        {/* 아바타 섹션 */}
        <section>
          <SectionTitle>Avatar</SectionTitle>
          <div className="flex items-center gap-4">
            <Avatar className="size-8">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
              <AvatarFallback>EF</AvatarFallback>
            </Avatar>
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">GH</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* 카드 섹션 */}
        <section>
          <SectionTitle>Card</SectionTitle>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 기본 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>기본 카드</CardTitle>
                <CardDescription>카드 설명 텍스트입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  카드 본문 내용이 여기에 들어갑니다. 다양한 컨텐츠를 담을 수
                  있습니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>

            {/* 사용자 프로필 카드 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      <User className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">홍길동</CardTitle>
                    <CardDescription>프론트엔드 개발자</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">팔로우</Button>
                <Button variant="outline" size="sm">
                  메시지
                </Button>
              </CardFooter>
            </Card>

            {/* 통계 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>이번 달 통계</CardTitle>
                <CardDescription>2026년 4월</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "총 방문자", value: "1,234", trend: "+12%" },
                  { label: "신규 가입", value: "89", trend: "+5%" },
                  { label: "전환율", value: "3.2%", trend: "-0.4%" },
                ].map(({ label, value, trend }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{value}</span>
                      <Badge
                        variant={
                          trend.startsWith("+") ? "secondary" : "destructive"
                        }
                        className="text-xs"
                      >
                        {trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  전체 리포트 보기
                  <ChevronRight className="ml-auto size-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
