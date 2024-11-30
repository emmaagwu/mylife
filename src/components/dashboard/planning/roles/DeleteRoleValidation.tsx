'use client'

interface DeleteRoleValidationProps {
  inputText: string
  targetText: string
}

export default function DeleteRoleValidation({ inputText, targetText }: DeleteRoleValidationProps) {
  const getValidationDetails = () => {
    if (!inputText) return null

    const inputLength = inputText.length
    const targetLength = targetText.length
    const lengthDiff = targetLength - inputLength

    const differences = []
    for (let i = 0; i < Math.max(inputLength, targetLength); i++) {
      if (inputText[i] !== targetText[i]) {
        if (i < inputLength) {
          differences.push(`Position ${i + 1}: Expected '${targetText[i] || ''}' but got '${inputText[i]}'`)
        } else {
          differences.push(`Position ${i + 1}: Missing '${targetText[i]}'`)
        }
      }
    }

    return {
      lengthDiff,
      differences: differences.slice(0, 3), // Show only first 3 differences
      hasMore: differences.length > 3,
      isLengthMatch: inputLength === targetLength,
      matchPercentage: Math.round(
        (targetText.split('').filter((char, i) => char === inputText[i]).length / targetLength) * 100
      )
    }
  }

  const details = getValidationDetails()
  if (!details) return null

  return (
    <div className="space-y-1 text-sm">
      {/* Length indicator */}
      <div className="flex items-center gap-2">
        <span className={details.isLengthMatch ? "text-green-600" : "text-yellow-600"}>
          Length: {inputText.length} / {targetText.length}
        </span>
        {!details.isLengthMatch && (
          <span className="text-muted-foreground">
            ({details.lengthDiff > 0 ? `${details.lengthDiff} more needed` : `${Math.abs(details.lengthDiff)} too many`})
          </span>
        )}
      </div>

      {/* Match percentage */}
      <div className="flex items-center gap-2">
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              details.matchPercentage === 100 
                ? "bg-green-600" 
                : details.matchPercentage > 50 
                  ? "bg-yellow-600" 
                  : "bg-red-600"
            }`}
            style={{ width: `${details.matchPercentage}%` }}
          />
        </div>
        <span className="text-xs w-12">{details.matchPercentage}%</span>
      </div>

      {/* Differences */}
      {details.differences.length > 0 && (
        <div className="text-destructive mt-2 space-y-1">
          {details.differences.map((diff, i) => (
            <p key={i} className="text-xs">{diff}</p>
          ))}
          {details.hasMore && (
            <p className="text-xs text-muted-foreground">...and more differences</p>
          )}
        </div>
      )}
    </div>
  )
}