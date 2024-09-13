"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Estilos para o PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
})

// Componente PDF que será gerado
const PdfDocument = ({ salary, education, cards, debts, savings, eligibility }: any) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Resultado da Simulação de Elegibilidade de Crédito</Text>
        <Text style={styles.text}>Salário Anual: R$ {salary}</Text>
        <Text style={styles.text}>Nível Educacional: {education}</Text>
        <Text style={styles.text}>Número de Cartões de Crédito: {cards}</Text>
        <Text style={styles.text}>Dívidas Totais: R$ {debts}</Text>
        <Text style={styles.text}>Dinheiro Guardado: R$ {savings}</Text>
        <Text style={styles.text}>Resultado da Simulação: {eligibility}</Text>
      </View>
    </Page>
  </Document>
)

const CreditEligibilityChecker = () => {
  const [salary, setSalary] = useState('')
  const [education, setEducation] = useState('')
  const [cards, setCards] = useState('')
  const [debts, setDebts] = useState('')
  const [savings, setSavings] = useState('')
  const [eligibility, setEligibility] = useState<string | null>(null)

  const checkEligibility = () => {
    let score = 0
    const annualSalary = parseFloat(salary) || 0
    const numCards = parseInt(cards) || 0
    const totalDebts = parseFloat(debts) || 0
    const totalSavings = parseFloat(savings) || 0

    if (annualSalary > 100000) score += 30
    else if (annualSalary > 50000) score += 20
    else if (annualSalary > 30000) score += 10

    if (education === 'postgraduate') score += 20
    else if (education === 'graduate') score += 15
    else if (education === 'undergraduate') score += 10

    if (numCards <= 2) score += 10
    else if (numCards <= 4) score += 5
    else score -= 5

    const debtToIncomeRatio = totalDebts / annualSalary
    if (debtToIncomeRatio < 0.1) score += 20
    else if (debtToIncomeRatio < 0.3) score += 10
    else if (debtToIncomeRatio > 0.5) score -= 10

    const savingsToIncomeRatio = totalSavings / annualSalary
    if (savingsToIncomeRatio > 0.2) score += 20
    else if (savingsToIncomeRatio > 0.1) score += 10

    if (score >= 70) {
      setEligibility('Elegível')
    } else if (score >= 50) {
      setEligibility('Potencialmente Elegível')
    } else {
      setEligibility('Não Elegível')
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Verificador de elegibilidade de crédito</CardTitle>
        <CardDescription>Insira seus dados financeiros para verificar sua elegibilidade de crédito</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); checkEligibility(); }} className="space-y-4 flex flex-col gap-4">
          <div className='flex gap-4 w-full sm:flex-row flex-col'>
            <div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salário Anual (R$)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Coloque seu salário anual"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Nível Educacional</Label>
                <Select onValueChange={setEducation} required>
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Selecione seu nível educacional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="highschool">Ensino médio</SelectItem>
                    <SelectItem value="undergraduate">Em Graduação</SelectItem>
                    <SelectItem value="graduate">Graduação Finalizada</SelectItem>
                    <SelectItem value="postgraduate">Pós Graduação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cards">Número de cartões de crédito</Label>
                <Input
                  id="cards"
                  type="number"
                  value={cards}
                  onChange={(e) => setCards(e.target.value)}
                  placeholder="Coloque o número de cartões de crédito"
                  min="0"
                  required
                />
              </div>
            </div>
            <div>
              <div className="space-y-2">
                <Label htmlFor="debts">Dívidas Totais (R$)</Label>
                <Input
                  id="debts"
                  type="number"
                  value={debts}
                  onChange={(e) => setDebts(e.target.value)}
                  placeholder="Coloque suas dívidas totais"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savings">Dinheiro Guardado (R$)</Label>
                <Input
                  id="savings"
                  type="number"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  placeholder="Coloque o total de dinheiro guardado"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">Verifique a elegibilidade</Button>
        </form>
        {eligibility && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Resultado de elegibilidade de crédito</h3>
            <p className={`text-2xl font-bold ${
              eligibility === 'Elegível' ? 'text-green-600' : 
              eligibility === 'Potencialmente Elegível' ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {eligibility}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Esta é uma estimativa baseada nas informações fornecidas, a elegibilidade real pode variar.
            </p>
            <div className="mt-4">
              <PDFDownloadLink
                document={<PdfDocument 
                  salary={salary} 
                  education={education} 
                  cards={cards} 
                  debts={debts} 
                  savings={savings} 
                  eligibility={eligibility} />}
                fileName="simulacao_credito.pdf"
              >
                {({ loading }) => (loading ? 'Gerando PDF...' : 'Baixar Simulação em PDF')}
              </PDFDownloadLink>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CreditEligibilityChecker;
